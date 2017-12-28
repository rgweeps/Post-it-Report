/* define */
const FIRST_NODE = 1;
const ID = 1;

/* �J�E���^ */
var nodecount = FIRST_NODE;
var storage = localStorage;

/* jQuery */
$(document).ready(function(){
	var fnode = $("#tbody2 > tr").clone(true).insertAfter($("#tbody2 > tr"));
	GetTime("time", fnode.find("textarea"));

	/* ���̓t�H�[���ǉ� */
	$(document).on("click", ".addList", function(){
		var node = $("#tbody2 > tr").eq(0).clone(true).insertAfter(
				$(this).parent().parent()
				);
	GetTime("time", node.find("textarea"));
	});

	/* ���̓t�H�[���폜 */
	$(document).on("click", ".removeList", function(){
		if ( $("#tbody2 > tr").length > FIRST_NODE+1 ){
			$(this).parent().parent().remove();
		}
	});

	/* �e�L�X�g�ۑ� */
	$(document).on("click", ".saveText", function(){
		var savetxt = $(this).parent().find("textarea").val();
		storage.setItem('userid', savetxt);
		})

	/* �e�L�X�g�ǂݍ��� */
	$(document).on("click", ".readText", function(){
		var loadtext = storage.getItem('userid');
		$(this).parent().find("textarea").val(loadtext);
	})
});

/* ���݂̎��Ԃ��擾 */
function GetTime(tableId, node){
	var weeks = ['��', '��', '��', '��', '��', '��', '�y'];
	var now = new Date();

	var year = now.getYear();
	var month = now.getMonth() + 1;
	var day = now.getDate();
	var week = weeks[now.getDay()];
	var hour = now.getHours();
	var min = now.getMinutes();

	if (year < 2000){ year += 1900; }
	if (month < 10) { month = "0" + month; }
	if (day < 10) { day= "0" + day; }
	if (hour < 10) { hour = "0" + hour; }
	if (min < 10) { min = "0" + min; }

	switch (tableId){
		case 'table1':
			current_time = year + '�N' + month + '��' + day + '��' + '(' + week + ')' + hour + '��' + min + '��' ;
			current_time2 = month + '��' + day + '��';
			document.write('<h4>'+ current_time +'</h4>');
			break;
		case 'time':
			CR = String.fromCharCode(13);
			var txt = '['+ hour + '��' + min + '��' + ']:' + CR;
			node.val(txt);
			break;
		default:
			document.write("failed");
			break;
	}
}

var input_data = [
	{name: '�`�[����', id: 'company_name'},
	{name: 'MP', id: 'id'},
	{name: '������', id: 'finder'},
];

var charge_data = ['Web1','Web2','Web3','���̑�'];

function CreateInputForm(data){
	for (var i = 0; i < data.length; i++){
		document.write('<tr>');
		document.write('<td align="right">'+data[i].name+':</td>');

		document.write('<td><input type="text" id="'+ data[i].id +'" class="form-control" size="25"</td>');
		document.write('</tr>');
	}
}

function CreateRadio(data){
	document.write('<form name="form1">');
	document.write('<tr>');
	document.write('<td align="right">�����ӏ�:</td>');
	document.write('<td class="radio">');
	for (var i = 0; i < data.length; i++) {
		document.write('<label> <input type="radio" name="charge" class="radio-inline" value="'+ data[i] +'">'+ data[i] + '</label>');
	}
	document.write('</label>');
	document.write('</td>');
	document.write('</tr>');
	document.write('</form>');
}

/* ���̓t�H�[������ */
function CreateTextForm(title, name, row){
		document.write('<tr>');
		document.write('<td align="right">'+title+'</td>');
		document.write('<td><textarea id="'+ name +'1" name="'+ name +'" class="form-control" cols="50" rows="'+ row +'"></textarea></td>');
		document.write('</tr>');
}

/* PukiWiki �`���Ƀe�L�X�g�𐮌` */
function OutputTicket(){
	CR = String.fromCharCode(13);
	var output = document.getElementById('output_ticket');

	// �C���V�f���g�T�v���o��
  var txt = '*** �C���V�f���g�T�v' + CR;
	//output.innerHTML += '�T�v~' + CR + CR;
	output.innerHTML += txt;

	output.innerHTML += current_time + '~' + CR;

	for (var i = 0;i < input_data.length; i++){
		var elem = document.getElementById(input_data[i].id);
		output.innerHTML += input_data[i].name + ': ' + elem.value + '~'+ CR;
	}

	for (var i = 0; i < charge_data.length; i++){
		if (document.form1.charge[i].checked == true){
			output.innerHTML += '�����ӏ�: ' + document.form1.charge[i].value + '~'+ CR;
		}
	}
  var elem = document.getElementById("content1");
	output.innerHTML += '��ȓ��e: ' + elem.value + '~' + CR + CR;

	/* ��Ɨ��� */
	output.innerHTML += '*** ��Ɨ���' + CR;
	output.innerHTML += current_time2 + '~' + CR;
	for (var i = FIRST_NODE; $("#tbody2 > tr").eq(i).length != 0; i++){
		nodeval = $("#tbody2 > tr").eq(i).find("textarea").val();
		if ( nodeval != undefined ) {
			output.innerHTML += nodeval + CR + CR;
		}
	}

	/* �������� */
	output.innerHTML += '*** ��������' + CR ;
  var elem = document.getElementById("source1");
	output.innerHTML += elem.value + CR;
}
