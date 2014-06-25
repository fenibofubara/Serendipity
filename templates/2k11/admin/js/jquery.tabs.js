/* jQuery-Accessible-Tabs - v1.9.8
* http://github.com/ginader/Accessible-Tabs
* Copyright (c) 2013 Dirk Ginader;
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html */
(function($){function debug(msg,info){debugMode&&window.console&&window.console.log&&(info?window.}var debugMode=!0;$.fn.extend({getUniqueId:function(p,q,r){return r=void 0===r?"":"-"+r,p+q+r},accessibleTabs:function(config){var defaults={wrapperClass:"content",currentClass:"current",tabhead:"h4",tabheadClass:"tabhead",tabbody:".tabbody",fx:"show",fxspeed:"normal",currentInfoText:"current tab: ",currentInfoPosition:"prepend",currentInfoClass:"current-info",tabsListClass:"tabs-list",syncheights:!1,syncHeightMethodName:"syncHeight",cssClassAvailable:!1,saveState:!1,autoAnchor:!1,pagination:!1,position:"top",wrapInnerNavLinks:"",firstNavItemClass:"first",lastNavItemClass:"last",clearfixClass:"clearfix"},keyCodes={37:-1,38:-1,39:1,40:1},positions={top:"prepend",bottom:"append"};this.options=$.extend(defaults,config);var tabsCount=0;void 0!==$("body").data("accessibleTabsCount")&&(tabsCount=$("body").data("accessibleTabsCount")),$("body").data("accessibleTabsCount",this.size()+tabsCount);var o=this;return this.each(function(t){var el=$(this),list="",tabCount=0,ids=[];$(el).wrapInner('<div class="'+o.options.wrapperClass+'"></div>'),$(el).find(o.options.tabhead).each(function(i){var id="",elId=$(this).attr("id");if(elId){if(0===elId.indexOf("accessibletabscontent"))return;id=' id="'+elId+'"'}var tabId=o.getUniqueId("accessibletabscontent",tabsCount+t,i),navItemId=o.getUniqueId("accessibletabsnavigation",tabsCount+t,i);if(ids.push(tabId),o.options.cssClassAvailable===!0){var cssClass="";$(this).attr("class")&&(cssClass=$(this).attr("class"),cssClass=' class="'+cssClass+'"'),list+='<li id="'+navItemId+'"><a'+id+cssClass+' href="#'+tabId+'">'+$(this).html()+"</a></li>"}else list+='<li id="'+navItemId+'"><a'+id+' href="#'+tabId+'">'+$(this).html()+"</a></li>";$(this).attr({id:tabId,"class":o.options.tabheadClass,tabindex:"-1"}),tabCount++}),o.options.syncheights&&$.fn[o.options.syncHeightMethodName]&&($(el).find(o.options.tabbody)[o.options.syncHeightMethodName](),$(window).resize(function(){$(el).find(o.options.tabbody)[o.options.syncHeightMethodName]()}));var tabs_selector="."+o.options.tabsListClass;$(el).find(tabs_selector).length||$(el)[positions[o.options.position]]('<ul class="'+o.options.clearfixClass+" "+o.options.tabsListClass+" tabamount"+tabCount+'"></ul>'),$(el).find(tabs_selector).append(list);var content=$(el).find(o.options.tabbody);if(content.length>0&&($(content).hide(),$(content[0]).show()),$(el).find("ul."+o.options.tabsListClass+">li:first").addClass(o.options.currentClass).addClass(o.options.firstNavItemClass).find("a")[o.options.currentInfoPosition]('<span class="'+o.options.currentInfoClass+'">'+o.options.currentInfoText+"</span>").parents("ul."+o.options.tabsListClass).children("li:last").addClass(o.options.lastNavItemClass),o.options.wrapInnerNavLinks&&$(el).find("ul."+o.options.tabsListClass+">li>a").wrapInner(o.options.wrapInnerNavLinks),$(el).find("ul."+o.options.tabsListClass+">li>a").each(function(i){$(this).click(function(event){event.preventDefault(),el.trigger("showTab.accessibleTabs",[$(event.target)]),o.options.saveState&&$.cookie&&$.cookie("accessibletab_"+el.attr("id")+"_active",i),$(el).find("ul."+o.options.tabsListClass+">li."+o.options.currentClass).removeClass(o.options.currentClass).find("span."+o.options.currentInfoClass).remove(),$(this).blur(),$(el).find(o.options.tabbody+":visible").hide(),$(el).find(o.options.tabbody).eq(i)[o.options.fx](o.options.fxspeed),$(this)[o.options.currentInfoPosition]('<span class="'+o.options.currentInfoClass+'">'+o.options.currentInfoText+"</span>").parent().addClass(o.options.currentClass),$($(this).attr("href")).focus().keyup(function(event){keyCodes[event.keyCode]&&(o.showAccessibleTab(i+keyCodes[event.keyCode]),$(this).unbind("keyup"))})}),$(this).focus(function(){$(document).keyup(function(event){keyCodes[event.keyCode]&&o.showAccessibleTab(i+keyCodes[event.keyCode])})}),$(this).blur(function(){$(document).unbind("keyup")})}),o.options.saveState&&$.cookie){var savedState=$.cookie("accessibletab_"+el.attr("id")+"_active");debug($.cookie("accessibletab_"+el.attr("id")+"_active")),null!==savedState&&o.showAccessibleTab(savedState,el.attr("id"))}if(o.options.autoAnchor&&window.location.hash){var anchorTab=$("."+o.options.tabsListClass).find(window.location.hash);anchorTab.size()&&anchorTab.click()}if(o.options.pagination){var m='<ul class="pagination">';m+='    <li class="previous"><a href="#{previousAnchor}"><span>{previousHeadline}</span></a></li>',m+='    <li class="next"><a href="#{nextAnchor}"><span>{nextHeadline}</span></a></li>',m+="</ul>";var tabs=$(el).find(".tabbody"),tabcount=tabs.size();tabs.each(function(idx){$(this).append(m);var next=idx+1;next>=tabcount&&(next=0);var previous=idx-1;0>previous&&(previous=tabcount-1);var p=$(this).find(".pagination"),previousEl=p.find(".previous");previousEl.find("span").text($("#"+ids[previous]).text()),previousEl.find("a").attr("href","#"+ids[previous]).click(function(event){event.preventDefault(),$(el).find(".tabs-list a").eq(previous).click()});var nextEl=p.find(".next");nextEl.find("span").text($("#"+ids[next]).text()),nextEl.find("a").attr("href","#"+ids[next]).click(function(event){event.preventDefault(),$(el).find(".tabs-list a").eq(next).click()})})}})},showAccessibleTab:function(index,id){debug("showAccessibleTab");var o=this;if(!id)return this.each(function(){var el=$(this);el.trigger("showTab.accessibleTabs");var links=el.find("ul."+o.options.tabsListClass+">li>a");el.trigger("showTab.accessibleTabs",[links.eq(index)]),links.eq(index).click()});var el=$("#"+id),links=el.find("ul."+o.options.tabsListClass+">li>a");el.trigger("showTab.accessibleTabs",[links.eq(index)]),links.eq(index).click()},showAccessibleTabSelector:function(selector){debug("showAccessibleTabSelector");var el=$(selector);el&&("a"===el.get(0).nodeName.toLowerCase()?el.click():debug("the selector of a showAccessibleTabSelector() call needs to point to a tabs headline!"))}})})(jQuery);
