'use strict'

function PropertySheet(object, graph) {
    //Build array of properties
	//var test = createCircleNode (5, 'red')
	var properties = []
	if(object !== undefined)
	{
		properties = object.getProperties()
	}
	
    //Create a HTML Table element.
    var table = document.createElement('TABLE')
    table.border = '1'
 
    //Set the column count.
    var columnCount = 2
 
    //Add the data rows.
    for (var i = 0; i < properties.length; i+=4) {
		// Create row
        var row = table.insertRow(-1)
		
		// Add name column
        var cell1 = row.insertCell(-1)
		var name = document.createTextNode(properties[i])
		cell1.appendChild(name)
		
		// Add editor
		var cell2 = row.insertCell(-1)
		var editor = document.createElement('BUTTON')
		editor.innerHTML = properties[i+1] + ' UNCAUGHT EDITOR'
		
		// Editor Type
		if(properties[i+1] === 'text')
		{
			editor = document.createElement('INPUT')
			editor.setAttribute('type', 'text')
			editor.style.width = '200px'
			editor.defaultValue = properties[i+2]()
		}
		else if(properties[i+1] === 'text_box')
		{
			editor = document.createElement('TEXTAREA')
			editor.defaultValue = 'testing'
		}
		else if(properties[i+1] === 'boolean')
		{
			editor=document.createElement('select')
			var op1 = new Option()
			op1.value = true
			op1.text = 'True'
			editor.options.add(op1)
			var op2 = new Option()
			op2.value = false
			op2.text = 'False'
			editor.options.add(op2)
			if(properties[i+2]())
			{
				editor.selectedIndex = 0
			}
			else
			{
				editor.selectedIndex = 1
			}
		}
		else if(properties[i+1] === 'arrow')
		{
			editor=document.createElement('select')
			var styles = getArrowStyles()
			let current = properties[i+2]()
			editor.selectedIndex = -1
			for(var j = 0; j < styles.length; j++)
			{
				let op = new Option()
				op.value = styles[j]
				op.text = styles[j]
				editor.options.add(op)
				if(current === op.value)
				{
					editor.selectedIndex = j
				}
			}
		}	
		
		// ID and add editor to column
		editor.id = 'edit' + (i/4)
		cell2.appendChild(editor)
    }
	// Add property Sheet
    var propertySheet = document.getElementById('propertySheet')
    propertySheet.innerHTML = ''
    propertySheet.appendChild(table)
	if(object !== undefined) {
		//Adding submit button
		var accept = document.createElement('BUTTON')
		accept.innerHTML = 'Submit'
		accept.onclick = function () {
			propertyEditor(object)
			document.getElementById('graphpanel').dispatchEvent(new CustomEvent("repaint"))
			document.getElementById('sequencepanel').dispatchEvent(new CustomEvent("repaint"))
		} 
		propertySheet.appendChild(accept);
	}
		
	// Changes property values to inputs using the set method
	function propertyEditor(obj){
		var prop = obj.getProperties()
		for (var i = 0; i < (prop.length/4); i++) {
			prop[i*4 + 3](document.getElementById('edit' + i).value)
		}
		
	}
}


