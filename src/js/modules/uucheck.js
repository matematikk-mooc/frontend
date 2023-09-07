export default (function () {
	class Translated {
		constructor (words, defaultlang='nb'){
			this.words = words;
			this.defaultlang = defaultlang;
		}
		toString(){
			return this.words[ENV.LOCALE]?this.words[ENV.LOCALE]:this.words[this.defaultlang];
		}
		use(...values){
			let returnstring = this.words[ENV.LOCALE]?this.words[ENV.LOCALE]:this.words[this.defaultlang];
			for (let i=0; i<values.length; i++){
				returnstring = returnstring.replace(`[${i}]`, values[i]);
			}
			return returnstring;
		}
	}


	function graphql(querydata){
		//get csrf_token from the pages cookie
		let csrf_token = decodeURIComponent(document.cookie.split(';').find((item) => item.trim().startsWith('_csrf_token')).replace(/\s*_csrf_token\s*\=\s*(.*)$/,"$1"));
		if (typeof(querydata)=="string") querydata = {'query': querydata};
		//create the graphql query using the querydata input
		return fetch(location.origin+"/api/graphql",{
			method: 'POST',
			mode: 'cors',
			credentials: 'same-origin',
			headers: {
				'Accept': 'application/json+canvas-string-ids, application/json, text/plain, */*',
				'Content-Type': 'application/json',
				'x-csrf-token': csrf_token
			},
			body: JSON.stringify(querydata)
		})

	}
	function Get (last_part_of_url){
		//Does a Canvas API call and returns a JS-object.
		return fetch(location.origin+'/api/v1/'+last_part_of_url);
	}


	let error = new Translated({en: 'Error', nb: 'Feil', nn: 'Feil'})
	let warning = new Translated({en: 'Warning', nb: 'Advarsel', nn: 'Åtvaring'})
	let imgerror = new Translated({en: "must be marked as decorative or get an alt text which isn't the filename.", nb:'må markeres som dekorativt eller få alternativ tekst som ikke er filnavnet.', nn:'må markerast som dekorativt eller få alternativ tekst som ikkje er filnamnet.'})
	let imgwarning = new Translated({en: "An image is marked as decorative in the old Canvas unstandared way. Open the Image Options and choose Done to rectify.", nb: "Et bilde er merket som dekorativt på den gamle ustandardiserte måten. Åpne Bilde-alternativer og klikk Ferdig for å rette opp.", nn: "Eit bilde er merka som dekorativt på den gamle ustandardiserte måten. Åpne Bilde-alternativ og klikk Ferdig for å retta opp."})
	let tablecaptionerror = new Translated({en: 'Table is missing caption.', nb:'Tabell mangler overskrift.', nn:'Tabell manglar overskrift.'})
	let tableheadererror = new Translated({en: 'Table is missing headers for rows and/or columns.', nb:'Tabell mangler titler på rader og/eller kolonner.', nn:'Tabell manglar titlar på rader og/eller kolonnar.'})
	let herror = new Translated({en: 'Error in the heading hierarchy.', nb:'Feil i overskriftshierarkiet.', nn:'Feil i overskriftshierarkiet.'})
	let stylewarning = new Translated({en:'Uses style - check if it is used to make a headline, destroys contrast or leads to other problems.', nb:'Bruker style - sjekk om det brukes for å lage overskrift, ødelegger kontrast eller fører til andre problemer.', nn:'Brukar style - sjekk om det blir brukt for å laga overskrift, øydelegg kontrast eller fører til andre problem.'})
	let summary = new Translated({en:'[0] errors, [1] warnings. Remember that this test does not check files, and only does a limited check of pages.', nb:'<hr><p>[0] feil, [1] advarsler. Husk at denne testen ikke sjekker filer, og bare gjør en begrenset sjekk av sider.</p>', nn:'[0] feil, [1] Åtvaringar. Hugs at denne testen ikkje sjekkar filer, og berre gjer ein avgrensa sjekk av sider.'})
	let nothing = new Translated({en: "Can't find anything to check.", nb:'Finner ingenting å sjekke.', nn: 'Finn ikkje noko å sjekka.'})
	let buttonname = new Translated({en: 'Mini accessibility check', nb:'Mini UU-sjekk', nn:'Mini UU-sjekk'})
	let assignment = new Translated({en: 'Assignment', nb: 'Oppgave', nn: 'Oppgåve'})
	let discussion = new Translated({en: 'Discussion', nb: 'Diskusjon', nn: 'Diskusjon'})
	let title = new Translated({en:'Mini accessibility check of', nb:'Mini-UUsjekk av', nn:'Mini-UUsjekk av'})
	let moduleword = new Translated({en:'Module', nb:'Modul', nn:'Modul'})
	let frontpage = new Translated({en:'Front page', nb:'Framside', nn:'Framside'})




	let content
	let myReport = document.getElementById('content')
	let warningimg = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAV9QTFRFAAAA78wA780A78sA8MwA7cwA78sA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA7ssA78wA780A78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA78wA7MoB6McC6ccC7coB8c4AuKAQY1ooZl0nxaoM8s4Atp4QNjY1ODg0v6UOwacNOzozwaYNPDszw6gNxqsMPjwyRUIw0LMJ8c0A1bcHR0QwSkYv2boG8M0AR0Mw48IEkH8b8MwA5sUDpI8V5cQDo44WrZYToY0WNzc0rJYTrZcT////FfOg+wAAAEl0Uk5TAAAAAAAAAw6NZPpgHs/OhH815DQGoJ1O8ksRvLps+2ck1dQjAYoBO+g5CaqnWfZUFsTBdP1yKNknA5KQQ+xADLOuC174XJmWi0BSZnkAAAABYktHRHTfbahtAAAACXBIWXMAAHYcAAB2HAGnwnjqAAABQ0lEQVQ4y83R6TcCURgG8J5KJZESErJGhYRIyBp6LWMZQ9m3VmX9/8/Rnak5LTN97vn03vf+zl01mpYLDAY0nTeaTMYmAmg3mzugVQeWTqIuC9QXsFIp3To1AZudAXuPCoCjl8T0OZQF+p0ScA4oArgGiY6OT06JhlwKQothN3Fn5xeXHLlH0CgwOkbEXwnXNzzR+EQDwKSntDufSCYTJUCeqXqBaS8Dt8m7ewa8vjoA/ww7P/fw+PTMsWrWXyN0mAuw9svr23sqzarAfM2XILggvkA6lclIgBaDVUsASyEJZHO5rARCy1VXxUpYesP8R6FQzEt1eFUGiKxJPeI+BeGLLw/WIxWBjWgFfAs/MohulgG2tsstShd//ypbEO3sikKPvRjJgufleYrti+fUtx2QSg61IoDPGvcoJG61QadphfwDJhlgwgxHE9AAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTgtMDMtMTZUMTU6MDg6NTQrMDE6MDAjvwJCAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE4LTAzLTE2VDE1OjA4OjU0KzAxOjAwUuK6/gAAAEZ0RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi43LjgtOSAyMDE2LTA2LTE2IFExNiBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ+a/NLYAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6aGVpZ2h0ADUxMsDQUFEAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTIxMjA5MzM0wRaIbQAAABN0RVh0VGh1bWI6OlNpemUAMTEuM0tCQkuEtvIAAABLdEVYdFRodW1iOjpVUkkAZmlsZTovLy4vdXBsb2Fkcy81Ni8zenM2MUNwLzEzNzAvaWYtd2VhdGhlci00OC0yNjgyODAzXzkwNzk1LnBuZ/c5R4UAAAAASUVORK5CYII=" alt="${warning}" style="display:inline-block" height="20px" width="20px">`
	let warningcount = 0
	let errorimage = `<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAX1QTFRFAAAA9EM29EI29EI380I29EE19UM39UM180M29UI280M19UI49UQ19EQ39EE29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29kI19EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29EM29UM29kM39EM29EM29EM29EM29EM29EI19EE09VZK925k9EY693Fn9U1B9VRI+8K+/uzr+IJ59EQ3+ZWN/vPy+q6p9Es/+8G9/////u3r+ZSN/vb1//z8+q+p93px/vTz/ufl9mVa9EY5/uvq931z+IR7+ZSM93xz/vb2+ZaO//r6/vHw9310+ZaP/vLx9EI0/uvp935293Rq/ujn9mlf9VBE+7Ou//39+q2n/unn+qyn9Es+9VBD9mZcUi+WXwAAAEd0Uk5TAAAAAAAAAAAAAAAAAAAABhYeFRNPjbXU4dNOEmzI+McBPrv7PAFa5eNVW+roVj/k4rq5/GYUxlCF0rSD90zFO+cBAT1NhoQndmoCAAAAAWJLR0RZmrL0GAAAAAlwSFlzAADsOAAA7DgBcSvKOAAAAcFJREFUOMuVk1dXwkAQhZnYGxEQDAQpKlZQKYoNsG+woIKowV6xY+/6291sQtiAL8xTTu53ZmfuzOh0ZQQA22wwGFmAf1XG1GK2tHKc1WK28RUlDPD2NgdSwuG081oCXO72DkRFR3tnJYWAp6sbFUVPr0cloKqvHyEhXlDjAkJen1osDAzif4tLeVlYXklgYsgN+fr8WF9dW08Ksp7aSG9u4e+AXGk12INIWNwWxQwhhNTOrri3j3MEQ1AjJRh24gQHh6JMEF0Uj45xSSPDUgoIS/2fkN+ZZFzWT8+IHzYM1IIZ5ROL4vp5lugXckujUKcD1oIoIn1J6cjCgg6MVkQTtI6sRgwYuHz7qatrSb+5VS3jDFrgjgC55L0GKH0ioziG0Jj0hLbI3CVNjOMi6zVtPjxmdyliAhqwUTZi1IbSf0pxTNInI8RJ0wi2+imn9Keken7BrURNEsCQYb2+vSv9y8P6kIfFqOO+T7x9Kv5gIv31XRg3JjqHMPHzW7QwXEzdqMZeb+nKTYUL9wHTvp7ipeXCM/Rau2YD2rX3x5qKLoMPOQuHEw3xpacFprl5+fQWIvz/58noWaN0vHqmnJP/A+ifvaULapWNAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE4LTAzLTIzVDE5OjE2OjE2KzAxOjAwXFTNiwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOC0wMy0yM1QxOToxNjoxNiswMTowMC0JdTcAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNi0wNi0xNiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfmvzS2AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAA1MTLA0FBRAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUxMhx8A9wAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTUyMTgyODk3NiUEvvAAAAATdEVYdFRodW1iOjpTaXplADE1LjNLQkLQFfTkAAAARHRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvTUU3bVZ4TC8xMzgwL3Zjc2NvbmZsaWN0aW5nXzkzNDk3LnBuZ8f687oAAAAASUVORK5CYII=" alt="${error}" style="display:inline-block" height="20px" width="20px">`
	let errorcount = 0

	function addToReport (htmlstring){
		let div=document.createElement('div')
		div.innerHTML = htmlstring
		myReport.append(div)
	}

	function HTMLcheck(html){
		let div = document.createElement('div')
		div.innerHTML = html
		let HTMLoutput = ''
		//imagecheck
		let imgtags = div.querySelectorAll('img')
		for (const img of imgtags){
			if (img.getAttribute('role') == 'presentation') continue
			if (img.getAttribute('data-decorative')){
				HTMLoutput += `<p>${warningimg} <strong>${img.alt}</strong> ${imgwarning}</p>`
				warningcount++
				continue
			}
			if (!['.jpg','.jpeg','.gif','.png','.svg'].includes(img.alt.substring(img.alt.lastIndexOf('.')))) continue
			HTMLoutput += `<p>${errorimage} <strong>${img.alt}</strong> ${imgerror}</p>`
			errorcount++
		}
		let tables = div.querySelectorAll('table')
		for (const table of tables){
			if (!table.querySelector('caption')){
				HTMLoutput += `<p>${errorimage} ${tablecaptionerror}</p>`
				errorcount++
			}
			if (!table.querySelector('th')){
				HTMLoutput += `<p>${errorimage} ${tableheadererror}</p>`
				errorcount++
			}
		}
		let headers = div.querySelectorAll("h2, h3, h4, h5, h6");
		let startlevel = 1;
		for (const header of headers){
			let newlevel = Number(header.tagName.substring(1))
			if (newlevel > startlevel+1){
				HTMLoutput += `<p>${errorimage} ${herror}</p>`
				errorcount++
				break
			}
			startlevel = newlevel
		}
		if (html.includes('style=')){
			HTMLoutput += `<p>${warningimg} ${stylewarning}</p>`
			warningcount++
		}

		return HTMLoutput
	}

	function assignmentcheck(item){
		let log = HTMLcheck(item.description)
		if (log)
		addToReport(`<h3>${assignment} <a href="${location.origin}/courses/${ENV.COURSE_ID}/assignments/${item._id}/edit" target="_blank">${item.name}</a></h3>${log}`)
	}
	function discussioncheck(item){
		let log = HTMLcheck(item.message)
		if (log)
		addToReport(`<h3>${discussion} <a href="${location.origin}/courses/${ENV.COURSE_ID}/discussion_topics/${item._id}/edit" target="_blank">${item.title}</a></h3>${log}`)
	}
	function pagecheck(item){
		if (!item._id) item._id = item.page_id
		if (!item.body)
		item  =  Get(`courses/${ENV.COURSE_ID}/pages/${item._id}`)
		if (!item.body) return
		console.log(item.body)
		let log = HTMLcheck(item.body)
		if (log){
			addToReport(`<h3><a href="${location.origin}/courses/${ENV.COURSE_ID}/pages/${item.page_id}/edit" target="_blank">${item.title}</a></h3>${log}`)
		}
	}
	function UUsjekk(){
		myReport.innerHTML = ''
		addToReport(`<h1>${title} ${content.data.course.name}</h1>`)
		let modules = content.data.course.modulesConnection.nodes
		if (modules.length){
			//Course with modules
			Get(`courses/${ENV.COURSE_ID}`)
			.then( coursedata => {
				if (coursedata.default_view == 'wiki'){
					//has front page which might not show up in modules
					let pages =  Get(`/courses/${ENV.COURSE_ID}/pages?per_page=100`)
					for (const page of pages){
						if (page.front_page){
							addToReport(`<h2>${frontpage}:</h2>`)
							console.log ("frontpage")
							pagecheck(page)
							break
						}
					}
				}
				for (const module of modules){
					addToReport(`<h2>${moduleword} ${module.name}</h2>`)
					for (const item of module.moduleItems){
						if (!item.content._id) continue
						if (item.content.description) { assignmentcheck(item.content); continue}
						if (item.content.message) { discussioncheck(item.content); continue}
						pagecheck(item.content)
					}
				}
			})
			addToReport(summary.use(errorcount,warningcount))
		}else{
			//Course without modules
			console.log('kurs uten moduler')
			Get(`/courses/${ENV.COURSE_ID}/pages?per_page=100`)
			.then(pages => {
				console.log (pages.length)
				if (pages.length){
					for (const page of pages){
						pagecheck(page)
					}
					addToReport(summary.use(errorcount,warningcount))
				}else{
					addToReport(`<p>${nothing}</p>`)
				}
			})
		}


	}
	return {
		addUUButton: function (){
			graphql(`query MyQuery {course(id: "${ENV.COURSE_ID}") {name modulesConnection {nodes {name moduleItems {content {... on Page {_id} ... on Assignment {_id name description state} ... on Discussion {_id message title}}}}}}}`)
			.then(res => res.json())
			.then(res => {
				let a = document.createElement('a');
				document.querySelector("#right-side table.summary").before(a);
				a.outerHTML = `<a class='Button Button--link Button--link--has-divider Button--course-settings' id="miniuusjekk"><i class='icon-off' /> ${buttonname}</a>`;
				content = res
				document.getElementById('miniuusjekk').onclick = UUsjekk

			}
			)
		}
	}
})();
