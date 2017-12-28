/* define */
const FIRST_NODE = 1;
const ID = 1;

/* カウンタ */
var nodecount = FIRST_NODE;
var storage = localStorage;

/* jQuery */
$(document).ready(function(){
	var fnode = $("#tbody2 > tr").clone(true).insertAfter($("#tbody2 > tr"));
	GetTime("time", fnode.find("textarea"));

	/* 入力フォーム追加 */
	$(document).on("click", ".addList", function(){
		var node = $("#tbody2 > tr").eq(0).clone(true).insertAfter(
				$(this).parent().parent()
				);
	GetTime("time", node.find("textarea"));
	});

	/* 入力フォーム削除 */
	$(document).on("click", ".removeList", function(){
		if ( $("#tbody2 > tr").length > FIRST_NODE+1 ){
			$(this).parent().parent().remove();
		}
	});

	/* テキスト保存 */
	$(document).on("click", ".saveText", function(){
		var savetxt = $(this).parent().find("textarea").val();
		storage.setItem('userid', savetxt);
		})

	/* テキスト読み込み */
	$(document).on("click", ".readText", function(){
		var loadtext = storage.getItem('userid');
		$(this).parent().find("textarea").val(loadtext);
	})
});

/* 現在の時間を取得 */
function GetTime(tableId, node){
	var weeks = ['日', '月', '火', '水', '木', '金', '土'];
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
			current_time = year + '年' + month + '月' + day + '日' + '(' + week + ')' + hour + '時' + min + '分' ;
			current_time2 = month + '月' + day + '日';
			document.write('<h4>'+ current_time +'</h4>');
			break;
		case 'time':
			CR = String.fromCharCode(13);
			var txt = '['+ hour + '時' + min + '分' + ']:' + CR;
			node.val(txt);
			break;
		default:
			document.write("failed");
			break;
	}
}

var input_data = [
	{name: 'チーム名', id: 'company_name'},
	{name: 'MP', id: 'id'},
	{name: '発見者', id: 'finder'},
];

var charge_data = ['Web1','Web2','Web3','その他'];

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
	document.write('<td align="right">発生箇所:</td>');
	document.write('<td class="radio">');
	for (var i = 0; i < data.length; i++) {
		document.write('<label> <input type="radio" name="charge" class="radio-inline" value="'+ data[i] +'">'+ data[i] + '</label>');
	}
	document.write('</label>');
	document.write('</td>');
	document.write('</tr>');
	document.write('</form>');
}

/* 入力フォーム生成 */
function CreateTextForm(title, name, row){
		document.write('<tr>');
		document.write('<td align="right">'+title+'</td>');
		document.write('<td><textarea id="'+ name +'1" name="'+ name +'" class="form-control" cols="50" rows="'+ row +'"></textarea></td>');
		document.write('</tr>');
}

/* PukiWiki 形式にテキストを整形 */
function OutputTicket(){
	CR = String.fromCharCode(13);
	var output = document.getElementById('output_ticket');

	// インシデント概要を出力
  var txt = '*** インシデント概要' + CR;
	//output.innerHTML += '概要~' + CR + CR;
	output.innerHTML += txt;

	output.innerHTML += current_time + '~' + CR;

	for (var i = 0;i < input_data.length; i++){
		var elem = document.getElementById(input_data[i].id);
		output.innerHTML += input_data[i].name + ': ' + elem.value + '~'+ CR;
	}

	for (var i = 0; i < charge_data.length; i++){
		if (document.form1.charge[i].checked == true){
			output.innerHTML += '発生箇所: ' + document.form1.charge[i].value + '~'+ CR;
		}
	}
  var elem = document.getElementById("content1");
	output.innerHTML += '主な内容: ' + elem.value + '~' + CR + CR;

	/* 作業履歴 */
	output.innerHTML += '*** 作業履歴' + CR;
	output.innerHTML += current_time2 + '~' + CR;
	for (var i = FIRST_NODE; $("#tbody2 > tr").eq(i).length != 0; i++){
		nodeval = $("#tbody2 > tr").eq(i).find("textarea").val();
		if ( nodeval != undefined ) {
			output.innerHTML += nodeval + CR + CR;
		}
	}

	/* 原因究明 */
	output.innerHTML += '*** 原因究明' + CR ;
  var elem = document.getElementById("source1");
	output.innerHTML += elem.value + CR;
}
