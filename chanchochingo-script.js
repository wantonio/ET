var imgSrc; 
var title;
var description;
var link;

var s = '';

$('.accordionToolsListing').each(function(){
	imgSrc = $(this).find(".toolsetDetails .openupMoreImages .openupImgSrc img").attr('src');
	imgName = $(this).find(".toolsetDetails .openupMoreImages .openupImgSrc img").attr('name');
	index = $(this).find(".toolsetDetails .openupMoreImages .openupImgSrc img").attr('index');
	title = $(this).find(".toolsetDetails .openupDescription h2").html();
	description = $(this).find(".toolsetDetails .openupDescription div").html();
	link = $(this).find(".toolsetDetails .openupDescription .ctaLearnMore a").attr('href');

	s += "<li class='p_tools_feature'><div class='p_tool_feature_image'><img index='"+index+"' name='"+imgName+"' src='"+ imgSrc +"'class='lnkEnlarge' alt='Toolset Launchpad'><span index="+index+" class='p_image_large'>Click for larger images</span></div><!-- end of Feature Image --><div class='p_tool_feature_description'><p class='p_tool_feature_title'>"+title+"</p><p>"+description+"</p><a href='"+link+"'>Learn More »</a></div><!-- End Feature Description --></li><!-- end of feature content -->"
});


