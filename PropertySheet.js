'use strict'

function PropertySheet(object) {
        //Build array of properties
        var properties = new Array();
        properties.push('prop');
        properties.push('testing');
        properties.push('prop');
        properties.push('text_box');
        properties.push('prop');
		properties.push('text');
		properties.push('prop');
		properties.push('boolean');
 
        //Create a HTML Table element.
        var table = document.createElement('TABLE');
        table.border = '1';
 
        //Get the count of columns.
        var columnCount = 2;
 
        //Add the header row.
        /*var row = table.insertRow(-1);
        for (var i = 0; i < columnCount; i++) {
            var headerCell = document.createElement('TH');
            headerCell.innerHTML = properties[0][i];
            row.appendChild(headerCell);
        } */
 
        //Add the data rows.
        for (var i = 0; i < properties.length; i+=2) {
            var row = table.insertRow(-1);
            var cell1 = row.insertCell(-1);
			var name = document.createTextNode(properties[i]);
			cell1.appendChild(name);
            //cell.innerHTML = properties[i][j];
			var cell2 = row.insertCell(-1);
			var editor = document.createElement('BUTTON');
			editor.innerHTML = properties[i+1];
			if(properties[i+1] === 'text')
			{
				editor = document.createElement('INPUT');
				editor.setAttribute('type', 'text');
				editor.style.width = '200px';
				editor.defaultValue = 'testing';
			}
			else if(properties[i+1] === 'text_box')
			{
				editor = document.createElement('TEXTAREA');
				editor.defaultValue = 'testing';
			}
			else if(properties[i+1] === 'boolean')
			{
				editor=document.createElement('select');
				var op1 = new Option();
				op1.value = 1;
				op1.text = 'True';
				editor.options.add(op1); 
				var op2 = new Option();
				op2.value = 1;
				op2.text = 'false';
				editor.options.add(op2); 
			}
			/*else if(properties[i+1] === 'enums_editor')
			{
				editor = document.createElement('select');
				for(int j = 0;j < 
			}*/
			cell2.appendChild(editor);
            
        }
 
        var propertySheet = document.getElementById('propertySheet');
        propertySheet.innerHTML = '';
        propertySheet.appendChild(table);
		
		//function text_editor{}
}

