import {config} from '/server/config';

// elastic Segment points preparation stuff
const indexName = !!config.elasticindexName ? config.elasticindexName : "edx-webpages";

/*
 select value,context_traits_email,properties_email,properties_asset_url,properties_category,properties_course,properties_date,properties_display_name,properties_education_model,properties_id,properties_label,properties_mode,properties_name,properties_org,properties_path,properties_provider,properties_referrer,properties_run from edx_webpages
 */

