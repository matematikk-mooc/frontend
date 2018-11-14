this.mmooc=this.mmooc||{};


function getItemTypeHtml(item)
{
	html = "";
	switch (item.type) {
		case "Page":
			html += '<i class="icon-document" aria-label="Item type: Document"></i>';
			break;
		case "Discussion":
			html += '<i class="icon-discussion" aria-label="Elementtype: diskusjoner"></i>';
			break;
		case "Assignment":
			html += '<i class="icon-assignment" aria-label="Elementtype: oppgave"></i>';
			break;
	}
	return html;
}
function getModuleItemHtml(item)
{
	var html = "";
	var buttonType = "";
	if (item.completion_requirement && item.completion_requirement.completed)
	{
		buttonType = "btn-success";
	}
	html += '<a class="btn ' + buttonType + '" role="button" href="' + item.html_url + '">';
	html += getItemTypeHtml(item);
	html += '</a>';
	return html;
}

function getContentItemHtml(item)
{
	var html = "<li ";
	if (item.completion_requirement && item.completion_requirement.completed)
	{
		html += 'style="background:#aaffaa;" ';
	}
	if(item.isCurrent)
	{
		html += 'class="active-kupp-menu-item">' + item.title + '</li>';
	}
	else
	{
		html += '><a href="' + item.html_url + '">' + item.title + '</a></li>';
	}
	return html;
}

jQuery(function($) {
	var courseId = mmooc.api.getCurrentCourseId();

	//Check for module list (mittdesign)
	var myFrontPage = $("#mittdesign");
	if (myFrontPage.length)
	{
		mmooc.api.getModulesForCurrentCourse(function(modules) {
			var totalItems = 0;
			var itemsCompleted = 0;

			var html = "";
			var noOfModules = modules.length;
			for (var i = 0; i < noOfModules; i++) {
				var m = modules[i];
				html = html + '<h2>' + m.name + '</h2>';
				for (var j = 0; j < m.items.length; j++) {
					totalItems++;
					var item = m.items[j];
					html += getModuleItemHtml(item);
					if (item.completion_requirement && item.completion_requirement.completed)
					{
						itemsCompleted++;
					}
				}
			}
			myFrontPage.html(html);

			//Check if there is a progress bar
			var myProgressbar = $("#minfremdriftsindikator");
			if(myProgressbar.length)
			{
				var percentage = itemsCompleted * 100 / totalItems;
				html = '<div class="progress">';
				html += '<div class="progress bar bar-success" style="width:' + percentage + '%">';
				html += '</div>';
				html += '</div>';
				myProgressbar.html(html);
			}
		});
	}



	//Check if we're on a content page
//		var kuppModuleMenu = $("#kupp-module-menu");
	var kuppModuleMenu = $(".show-content");
	if(kuppModuleMenu.length)
	{
		mmooc.api.getCurrentModule(function(module) {
			html = '<ul class="kupp-module-menu">';
			html += '<li class="module-home"><a href="/courses/"' + courseId + '"/modules/">Tilbake til moduloversikten</a></li>';
			for (var i = 0; i < module.items.length; i++) {
				var item = module.items[i];
				html = html + getContentItemHtml(item);
			}
			html += '</ul>';
//				kuppModuleMenu.html(html);
			kuppModuleMenu.prepend(html);
		});
	}
});
