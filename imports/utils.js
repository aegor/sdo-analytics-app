import {config} from '../imports/config.js';
import {convert} from 'dotize';

export const debugLog = function (m, o){
  if (config.debugLog) {
    console.log(m, ": ");
    console.log(o);
  }
}

export const prepareSegmentPoint = function (req) {
  var point = {};
  var res = {};
  res.tags = {};
  /* convert hierarchical objects to "slashed" flat format */
  var r = convert(req.body);
  for (var i in r) {
    var v = r[i];
    /* check for empty objects, prevent to insert into database */
    if (!v || (typeof v === 'object' && _.isEmpty(v) )) {
      debugLog('Empty object', {i, v});
      continue;
    }
    /* Processing special cases of object representation */
    if (i.includes("context_library")) {
      debugLog('Unregistered property', {i, v});
      continue;
    }
    if (i.includes("context_traits_")) {
      point[i.split("context_traits_")[1]] = v;
    }
    else if (i.indexOf("context_") === 0) {
      point[i.split("context_")[1]] = v;
    }
    else if (i.indexOf("properties_") === 0) {
      point[i.split("properties_")[1]] = v;
    }
    else if (i.indexOf("receivedAt") === 0) {
      point[i] = new Date(v).valueOf();
    }
    else if (i.indexOf("sentAt") === 0) {
      point[i] = new Date(v).valueOf();
    }
    else if (i.indexOf("originalTimestamp") === 0) {
      point.time = new Date(v).valueOf();
    }
    else if (i.indexOf("event") === 0) {
      point[i] = v;
    }
    else if (i.indexOf("type") === 0) {
      point[i] = v;
    }
    else if (i.indexOf("userId") === 0) {
      point[i] = v;
    }
    else {
      debugLog('Unregistered property', {i, v});
    }
  }
  res.value = point.time;
  res.tags = point;
  res.seriesName = !!config.influxdbSeriesName ? config.influxdbSeriesName : "edx_webpages";
  return res;
};

// elastic Segment points preparation stuff
const indexName = !!config.elasticindexName ? config.elasticindexName : "edx-webpages";

/*
 select value,context_traits_email,properties_email,properties_asset_url,properties_category,properties_course,properties_date,properties_display_name,properties_education_model,properties_id,properties_label,properties_mode,properties_name,properties_org,properties_path,properties_provider,properties_referrer,properties_run from edx_webpages
 */