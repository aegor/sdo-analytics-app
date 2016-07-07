import {config} from '../imports/config.js';
import {convert} from 'dotize';


export const prepareSegmentPoint = function (req) {
  var point = {};
  var res = {}; res.tags = {};
  /* convert hierarchical objects to "slashed" flat format */
  var r = convert(req.body);
  for (var i in r) {
    var v = r[i];
    /* check for empty objects, prevent to insert into database */
    if (!v || (typeof v === 'object' && _.isEmpty(v) )) {
      console.log('Empty object: ')
      console.log(i, ": ", v);
      continue;
    }
    /* Processing special cases of object representation */
    if (i.includes("context_library")){
      console.log("Unregistered property: ", i);
      continue;
    }
    if (i.includes("context_traits_")){
      point[i.split("context_traits_")[1]] = v;
    }
    else if (i.indexOf("context_") === 0){
      point[i.split("context_")[1]] = v;
    }
    else if (i.indexOf("properties_") === 0){
      point[i.split("properties_")[1]] = v;
    }
    else if (i.indexOf("receivedAt") === 0){
      point[i] = new Date(v).valueOf();
    }
    else if (i.indexOf("sentAt") === 0){
      point[i] = new Date(v).valueOf();
    }
    else if (i.indexOf("originalTimestamp") === 0){
      point[i] = new Date(v).valueOf();
    }
    else if (i.indexOf("event") === 0){
     point[i] = v;
    }
    else if (i.indexOf("type") === 0){
      point[i] = v;
    }
    else if (i.indexOf("userId") === 0){
      point[i] = v;
    }
    else {
      console.log("Unregistered property: ", i);
      continue;
    }
  }
  res.value = point.time;
  res.tags = point;
  res.seriesName = !!config.influxdb ? config.influxdb : "edx_webpages";
  return res;
};

// elastic Segment points preparation stuff
const indexName = !!config.elasticindexName ? config.elasticindexName : "edx-webpages";






/*

 category messageId  name  projectId writeKey

 receivedAt sentAt originalTimestamp

 event
 type
 userId

 context_ip
 context_page_path
 context_page_referrer
 context_page_search
 context_page_title
 context_page_url
 context_traits_boname
 context_traits_education_model
 context_traits_email
 context_traits_full_name
 context_traits_is_admin
 context_traits_is_staff
 context_traits_municipality
 context_traits_school
 context_traits_user_class
 context_traits_username
 context_userAgent

 properties_asset_url
 properties_category
 properties_course
 properties_date
 properties_display_name
 properties_education_model
 properties_email
 properties_full_name
 properties_id
 properties_label
 properties_mode
 properties_municipality
 properties_name
 properties_org
 properties_path
 properties_provider
 properties_referrer
 properties_run
 properties_school
 properties_search
 properties_title
 properties_url
 properties_user_class
 properties_username


 traits_boname
 traits_education_model
 traits_email
 traits_full_name
 traits_is_admin
 traits_is_staff
 traits_municipality
 traits_name
 traits_school
 traits_user_class
 traits_username



 */
/*
 select value,context_traits_email,properties_email,properties_asset_url,properties_category,properties_course,properties_date,properties_display_name,properties_education_model,properties_id,properties_label,properties_mode,properties_name,properties_org,properties_path,properties_provider,properties_referrer,properties_run from edx_webpages
 */