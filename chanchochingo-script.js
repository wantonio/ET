

$('.featurescreenshot .coda-nav li').each(function(){
	var index = parseInt($(this).attr('name'));
	
	$('.subtabnameFeatureAll .subTabsFeaturesItem')[index]
	products += '{\n' + '\t"title":"' + $($('.subtabnameFeatureAll .subTabsFeaturesItem .categoryTitle')[index] ).html() + '",\n';
	products += '\t"description":"' + $($('.subtabnameFeatureAll .subTabsFeaturesItem .subTabsScreenModalDesc p')[index] ).html() + '",\n';
	products += '\t"images":\n\t{\n\t\t"thumbnail": "' + $(this).find('img').attr('src') + '",\n';
	products += '\t\t"large": "' + $($(this).parent().parent().parent().find('.preload .panel img')[index] ).attr('src') + '"\n\t}\n},\n'
});

var imgSrc; 
var title;
var description;
var link;

var s = '';

$('.accordionToolsListing').each(function(){
	imgSrc = $(this).find(".toolsetDetails .openupMoreImages .openupImgSrc img").attr('src');
	index = $(imgSrc).attr('index');
	title = $(this).find(".toolsetDetails .openupDescription h2").html();
	description = $(this).find(".toolsetDetails .openupDescription div").html();
	link = $(this).find(".toolsetDetails .openupDescription .ctaLearnMore a").attr('href');

	s += "<li class='p_tools_feature'><div class='p_tool_feature_image'><img index='0' name='"+index+"' src='"+ imgSrc +"'class='lnkEnlarge' alt='Toolset Launchpad'><span class='p_image_large'>Click for larger images</span></div><!-- end of Feature Image --><div class='p_tool_feature_description'><p class='p_tool_feature_title'>"+title+"</p><p>"+description+"</p><a href='"+link+"'>Learn More »</a></div><!-- End Feature Description --></li><!-- end of feature content -->"
});

document.write(s);

