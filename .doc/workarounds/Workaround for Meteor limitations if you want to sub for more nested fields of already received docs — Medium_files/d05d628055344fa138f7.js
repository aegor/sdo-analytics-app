document.write('<link rel="stylesheet" href="https://assets-cdn.github.com/assets/gist-embed-388b069d66e6d3bd1f07d4a206ef1fa31d50dffe23ee28e23708b8a25537af01.css">')
document.write('<div id=\"gist17673953\" class=\"gist\">\n    <div class=\"gist-file\">\n      <div class=\"gist-data\">\n        <div class=\"js-gist-file-update-container js-task-list-container file-box\">\n  <div id=\"file-pub-album_edit-js\" class=\"file\">\n    \n\n  <div itemprop=\"text\" class=\"blob-wrapper data type-javascript\">\n      <table class=\"highlight tab-size js-file-line-container\" data-tab-size=\"8\">\n      <tr>\n        <td id=\"file-pub-album_edit-js-L1\" class=\"blob-num js-line-number\" data-line-number=\"1\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC1\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-k\">if<\/span> (<span class=\"pl-smi\">Meteor<\/span>.<span class=\"pl-smi\">isClient<\/span>)<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L2\" class=\"blob-num js-line-number\" data-line-number=\"2\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC2\" class=\"blob-code blob-code-inner js-file-line\">{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L3\" class=\"blob-num js-line-number\" data-line-number=\"3\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC3\" class=\"blob-code blob-code-inner js-file-line\">	CC_Albums_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">new<\/span> <span class=\"pl-en\">Meteor.Collection<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_Albums_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L4\" class=\"blob-num js-line-number\" data-line-number=\"4\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC4\" class=\"blob-code blob-code-inner js-file-line\">	CC_AlbumItems_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">new<\/span> <span class=\"pl-en\">Meteor.Collection<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_AlbumItems_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L5\" class=\"blob-num js-line-number\" data-line-number=\"5\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC5\" class=\"blob-code blob-code-inner js-file-line\">	CC_AlbumNotes_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-k\">new<\/span> <span class=\"pl-en\">Meteor.Collection<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_AlbumNotes_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L6\" class=\"blob-num js-line-number\" data-line-number=\"6\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC6\" class=\"blob-code blob-code-inner js-file-line\">}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L7\" class=\"blob-num js-line-number\" data-line-number=\"7\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC7\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L8\" class=\"blob-num js-line-number\" data-line-number=\"8\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC8\" class=\"blob-code blob-code-inner js-file-line\"><span class=\"pl-smi\">Meteor<\/span>.<span class=\"pl-en\">publish<\/span>(<span class=\"pl-s\"><span class=\"pl-pds\">&quot;<\/span>album_edit<span class=\"pl-pds\">&quot;<\/span><\/span>, <span class=\"pl-k\">function<\/span>(<span class=\"pl-smi\">albumId<\/span>) <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L9\" class=\"blob-num js-line-number\" data-line-number=\"9\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC9\" class=\"blob-code blob-code-inner js-file-line\">{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L10\" class=\"blob-num js-line-number\" data-line-number=\"10\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC10\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-en\">check<\/span>(albumId, <span class=\"pl-c1\">String<\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L11\" class=\"blob-num js-line-number\" data-line-number=\"11\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC11\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L12\" class=\"blob-num js-line-number\" data-line-number=\"12\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC12\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">if<\/span> (<span class=\"pl-k\">!<\/span>(<span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span> <span class=\"pl-k\">||<\/span> albumId))<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L13\" class=\"blob-num js-line-number\" data-line-number=\"13\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC13\" class=\"blob-code blob-code-inner js-file-line\">	{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L14\" class=\"blob-num js-line-number\" data-line-number=\"14\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC14\" class=\"blob-code blob-code-inner js-file-line\">		<span class=\"pl-v\">this<\/span>.<span class=\"pl-en\">ready<\/span>();<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L15\" class=\"blob-num js-line-number\" data-line-number=\"15\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC15\" class=\"blob-code blob-code-inner js-file-line\">		<span class=\"pl-k\">return<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L16\" class=\"blob-num js-line-number\" data-line-number=\"16\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC16\" class=\"blob-code blob-code-inner js-file-line\">	}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L17\" class=\"blob-num js-line-number\" data-line-number=\"17\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC17\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L18\" class=\"blob-num js-line-number\" data-line-number=\"18\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC18\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">var<\/span> album, album_unpublishedFields, <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L19\" class=\"blob-num js-line-number\" data-line-number=\"19\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC19\" class=\"blob-code blob-code-inner js-file-line\">	    albumItems, albumItems_unpublishedFields, <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L20\" class=\"blob-num js-line-number\" data-line-number=\"20\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC20\" class=\"blob-code blob-code-inner js-file-line\">            albumNote, albumNote_unpublishedFields;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L21\" class=\"blob-num js-line-number\" data-line-number=\"21\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC21\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L22\" class=\"blob-num js-line-number\" data-line-number=\"22\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC22\" class=\"blob-code blob-code-inner js-file-line\">	album <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">Albums<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L23\" class=\"blob-num js-line-number\" data-line-number=\"23\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC23\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L24\" class=\"blob-num js-line-number\" data-line-number=\"24\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC24\" class=\"blob-code blob-code-inner js-file-line\">			_id<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L25\" class=\"blob-num js-line-number\" data-line-number=\"25\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC25\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L26\" class=\"blob-num js-line-number\" data-line-number=\"26\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC26\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L27\" class=\"blob-num js-line-number\" data-line-number=\"27\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC27\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L28\" class=\"blob-num js-line-number\" data-line-number=\"28\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC28\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L29\" class=\"blob-num js-line-number\" data-line-number=\"29\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC29\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L30\" class=\"blob-num js-line-number\" data-line-number=\"30\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC30\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>title.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">0<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L31\" class=\"blob-num js-line-number\" data-line-number=\"31\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC31\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>slug.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">0<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L32\" class=\"blob-num js-line-number\" data-line-number=\"32\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC32\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L33\" class=\"blob-num js-line-number\" data-line-number=\"33\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC33\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L34\" class=\"blob-num js-line-number\" data-line-number=\"34\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC34\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L35\" class=\"blob-num js-line-number\" data-line-number=\"35\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC35\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L36\" class=\"blob-num js-line-number\" data-line-number=\"36\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC36\" class=\"blob-code blob-code-inner js-file-line\">	album_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">Albums<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L37\" class=\"blob-num js-line-number\" data-line-number=\"37\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC37\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L38\" class=\"blob-num js-line-number\" data-line-number=\"38\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC38\" class=\"blob-code blob-code-inner js-file-line\">			_id<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L39\" class=\"blob-num js-line-number\" data-line-number=\"39\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC39\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L40\" class=\"blob-num js-line-number\" data-line-number=\"40\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC40\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L41\" class=\"blob-num js-line-number\" data-line-number=\"41\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC41\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L42\" class=\"blob-num js-line-number\" data-line-number=\"42\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC42\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L43\" class=\"blob-num js-line-number\" data-line-number=\"43\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC43\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L44\" class=\"blob-num js-line-number\" data-line-number=\"44\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC44\" class=\"blob-code blob-code-inner js-file-line\">				owner<span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L45\" class=\"blob-num js-line-number\" data-line-number=\"45\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC45\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>title.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L46\" class=\"blob-num js-line-number\" data-line-number=\"46\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC46\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>slug.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L47\" class=\"blob-num js-line-number\" data-line-number=\"47\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC47\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L48\" class=\"blob-num js-line-number\" data-line-number=\"48\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC48\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L49\" class=\"blob-num js-line-number\" data-line-number=\"49\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC49\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L50\" class=\"blob-num js-line-number\" data-line-number=\"50\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC50\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L51\" class=\"blob-num js-line-number\" data-line-number=\"51\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC51\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">if<\/span> (<span class=\"pl-k\">!<\/span><span class=\"pl-smi\">album<\/span>.<span class=\"pl-en\">fetch<\/span>()[<span class=\"pl-c1\">0<\/span>])<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L52\" class=\"blob-num js-line-number\" data-line-number=\"52\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC52\" class=\"blob-code blob-code-inner js-file-line\">	{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L53\" class=\"blob-num js-line-number\" data-line-number=\"53\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC53\" class=\"blob-code blob-code-inner js-file-line\">		<span class=\"pl-v\">this<\/span>.<span class=\"pl-en\">ready<\/span>();<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L54\" class=\"blob-num js-line-number\" data-line-number=\"54\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC54\" class=\"blob-code blob-code-inner js-file-line\">		<span class=\"pl-k\">return<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L55\" class=\"blob-num js-line-number\" data-line-number=\"55\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC55\" class=\"blob-code blob-code-inner js-file-line\">	}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L56\" class=\"blob-num js-line-number\" data-line-number=\"56\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC56\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L57\" class=\"blob-num js-line-number\" data-line-number=\"57\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC57\" class=\"blob-code blob-code-inner js-file-line\">	albumId <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">album<\/span>.<span class=\"pl-en\">fetch<\/span>()[<span class=\"pl-c1\">0<\/span>].<span class=\"pl-smi\">_id<\/span>;<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L58\" class=\"blob-num js-line-number\" data-line-number=\"58\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC58\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L59\" class=\"blob-num js-line-number\" data-line-number=\"59\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC59\" class=\"blob-code blob-code-inner js-file-line\">	albumItems <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">AlbumItems<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L60\" class=\"blob-num js-line-number\" data-line-number=\"60\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC60\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L61\" class=\"blob-num js-line-number\" data-line-number=\"61\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC61\" class=\"blob-code blob-code-inner js-file-line\">			album<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L62\" class=\"blob-num js-line-number\" data-line-number=\"62\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC62\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L63\" class=\"blob-num js-line-number\" data-line-number=\"63\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC63\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L64\" class=\"blob-num js-line-number\" data-line-number=\"64\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC64\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L65\" class=\"blob-num js-line-number\" data-line-number=\"65\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC65\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span> <\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L66\" class=\"blob-num js-line-number\" data-line-number=\"66\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC66\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L67\" class=\"blob-num js-line-number\" data-line-number=\"67\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC67\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>order.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">0<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L68\" class=\"blob-num js-line-number\" data-line-number=\"68\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC68\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L69\" class=\"blob-num js-line-number\" data-line-number=\"69\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC69\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L70\" class=\"blob-num js-line-number\" data-line-number=\"70\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC70\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L71\" class=\"blob-num js-line-number\" data-line-number=\"71\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC71\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L72\" class=\"blob-num js-line-number\" data-line-number=\"72\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC72\" class=\"blob-code blob-code-inner js-file-line\">	albumItems_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">AlbumItems<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L73\" class=\"blob-num js-line-number\" data-line-number=\"73\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC73\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L74\" class=\"blob-num js-line-number\" data-line-number=\"74\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC74\" class=\"blob-code blob-code-inner js-file-line\">			album<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L75\" class=\"blob-num js-line-number\" data-line-number=\"75\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC75\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L76\" class=\"blob-num js-line-number\" data-line-number=\"76\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC76\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L77\" class=\"blob-num js-line-number\" data-line-number=\"77\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC77\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L78\" class=\"blob-num js-line-number\" data-line-number=\"78\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC78\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L79\" class=\"blob-num js-line-number\" data-line-number=\"79\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC79\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L80\" class=\"blob-num js-line-number\" data-line-number=\"80\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC80\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>album<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L81\" class=\"blob-num js-line-number\" data-line-number=\"81\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC81\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>order.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L82\" class=\"blob-num js-line-number\" data-line-number=\"82\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC82\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L83\" class=\"blob-num js-line-number\" data-line-number=\"83\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC83\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L84\" class=\"blob-num js-line-number\" data-line-number=\"84\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC84\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L85\" class=\"blob-num js-line-number\" data-line-number=\"85\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC85\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L86\" class=\"blob-num js-line-number\" data-line-number=\"86\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC86\" class=\"blob-code blob-code-inner js-file-line\">	albumNote <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">AlbumNotes<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L87\" class=\"blob-num js-line-number\" data-line-number=\"87\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC87\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L88\" class=\"blob-num js-line-number\" data-line-number=\"88\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC88\" class=\"blob-code blob-code-inner js-file-line\">			album<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L89\" class=\"blob-num js-line-number\" data-line-number=\"89\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC89\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L90\" class=\"blob-num js-line-number\" data-line-number=\"90\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC90\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L91\" class=\"blob-num js-line-number\" data-line-number=\"91\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC91\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L92\" class=\"blob-num js-line-number\" data-line-number=\"92\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC92\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L93\" class=\"blob-num js-line-number\" data-line-number=\"93\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC93\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L94\" class=\"blob-num js-line-number\" data-line-number=\"94\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC94\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>sirtrevor.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">0<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L95\" class=\"blob-num js-line-number\" data-line-number=\"95\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC95\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L96\" class=\"blob-num js-line-number\" data-line-number=\"96\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC96\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L97\" class=\"blob-num js-line-number\" data-line-number=\"97\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC97\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L98\" class=\"blob-num js-line-number\" data-line-number=\"98\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC98\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L99\" class=\"blob-num js-line-number\" data-line-number=\"99\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC99\" class=\"blob-code blob-code-inner js-file-line\">	albumNote_unpublishedFields <span class=\"pl-k\">=<\/span> <span class=\"pl-smi\">AlbumNotes<\/span>.<span class=\"pl-c1\">find<\/span>(<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L100\" class=\"blob-num js-line-number\" data-line-number=\"100\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC100\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L101\" class=\"blob-num js-line-number\" data-line-number=\"101\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC101\" class=\"blob-code blob-code-inner js-file-line\">			album<span class=\"pl-k\">:<\/span> albumId,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L102\" class=\"blob-num js-line-number\" data-line-number=\"102\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC102\" class=\"blob-code blob-code-inner js-file-line\">			owner<span class=\"pl-k\">:<\/span> <span class=\"pl-v\">this<\/span>.<span class=\"pl-smi\">userId<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L103\" class=\"blob-num js-line-number\" data-line-number=\"103\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC103\" class=\"blob-code blob-code-inner js-file-line\">		},<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L104\" class=\"blob-num js-line-number\" data-line-number=\"104\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC104\" class=\"blob-code blob-code-inner js-file-line\">		{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L105\" class=\"blob-num js-line-number\" data-line-number=\"105\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC105\" class=\"blob-code blob-code-inner js-file-line\">			fields<span class=\"pl-k\">:<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L106\" class=\"blob-num js-line-number\" data-line-number=\"106\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC106\" class=\"blob-code blob-code-inner js-file-line\">			{<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L107\" class=\"blob-num js-line-number\" data-line-number=\"107\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC107\" class=\"blob-code blob-code-inner js-file-line\">				album<span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L108\" class=\"blob-num js-line-number\" data-line-number=\"108\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC108\" class=\"blob-code blob-code-inner js-file-line\">				owner<span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span>,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L109\" class=\"blob-num js-line-number\" data-line-number=\"109\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC109\" class=\"blob-code blob-code-inner js-file-line\">				<span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>sirtrevor.unpublished<span class=\"pl-pds\">&#39;<\/span><\/span><span class=\"pl-k\">:<\/span> <span class=\"pl-c1\">1<\/span><\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L110\" class=\"blob-num js-line-number\" data-line-number=\"110\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC110\" class=\"blob-code blob-code-inner js-file-line\">			}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L111\" class=\"blob-num js-line-number\" data-line-number=\"111\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC111\" class=\"blob-code blob-code-inner js-file-line\">		}<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L112\" class=\"blob-num js-line-number\" data-line-number=\"112\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC112\" class=\"blob-code blob-code-inner js-file-line\">	);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L113\" class=\"blob-num js-line-number\" data-line-number=\"113\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC113\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L114\" class=\"blob-num js-line-number\" data-line-number=\"114\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC114\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-smi\">Mongo<\/span>.<span class=\"pl-smi\">Collection<\/span>.<span class=\"pl-en\">_publishCursor<\/span>(album_unpublishedFields, <span class=\"pl-v\">this<\/span>, <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_Albums_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L115\" class=\"blob-num js-line-number\" data-line-number=\"115\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC115\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-smi\">Mongo<\/span>.<span class=\"pl-smi\">Collection<\/span>.<span class=\"pl-en\">_publishCursor<\/span>(albumItems_unpublishedFields, <span class=\"pl-v\">this<\/span>, <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_AlbumItems_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L116\" class=\"blob-num js-line-number\" data-line-number=\"116\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC116\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-smi\">Mongo<\/span>.<span class=\"pl-smi\">Collection<\/span>.<span class=\"pl-en\">_publishCursor<\/span>(albumNote_unpublishedFields, <span class=\"pl-v\">this<\/span>, <span class=\"pl-s\"><span class=\"pl-pds\">&#39;<\/span>CC_AlbumNotes_unpublishedFields<span class=\"pl-pds\">&#39;<\/span><\/span>);<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L117\" class=\"blob-num js-line-number\" data-line-number=\"117\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC117\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L118\" class=\"blob-num js-line-number\" data-line-number=\"118\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC118\" class=\"blob-code blob-code-inner js-file-line\">	<span class=\"pl-k\">return<\/span> [<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L119\" class=\"blob-num js-line-number\" data-line-number=\"119\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC119\" class=\"blob-code blob-code-inner js-file-line\">		album,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L120\" class=\"blob-num js-line-number\" data-line-number=\"120\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC120\" class=\"blob-code blob-code-inner js-file-line\">		albumItems,<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L121\" class=\"blob-num js-line-number\" data-line-number=\"121\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC121\" class=\"blob-code blob-code-inner js-file-line\">		albumNote<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L122\" class=\"blob-num js-line-number\" data-line-number=\"122\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC122\" class=\"blob-code blob-code-inner js-file-line\">	]<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L123\" class=\"blob-num js-line-number\" data-line-number=\"123\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC123\" class=\"blob-code blob-code-inner js-file-line\">\n<\/td>\n      <\/tr>\n      <tr>\n        <td id=\"file-pub-album_edit-js-L124\" class=\"blob-num js-line-number\" data-line-number=\"124\"><\/td>\n        <td id=\"file-pub-album_edit-js-LC124\" class=\"blob-code blob-code-inner js-file-line\">});<\/td>\n      <\/tr>\n<\/table>\n\n  <\/div>\n\n  <\/div>\n  \n<\/div>\n\n      <\/div>\n      <div class=\"gist-meta\">\n        <a href=\"https://gist.github.com/MaximDubrovin/d05d628055344fa138f7/raw/79eca4876f9ad42110c24c7bc5d08cec0f95bf36/pub.album_edit.js\" style=\"float:right\">view raw<\/a>\n        <a href=\"https://gist.github.com/MaximDubrovin/d05d628055344fa138f7#file-pub-album_edit-js\">pub.album_edit.js<\/a>\n        hosted with &#10084; by <a href=\"https://github.com\">GitHub<\/a>\n      <\/div>\n    <\/div>\n<\/div>\n')
