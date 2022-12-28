/**
 * メッセージ言語変更処理
 */
function ChangeMsgLanguage(lang){
	startMeasuringElapsedTime("ChangeMsgLanguageStart");
	if(lang == "jp"){
		setMsgJp();
	}else if(lang == "en"){
		setMsgEn();
	}else if(lang == "kr"){
		setMsgKr();
	}else if(lang == "cn"){
		setMsgCn();
	}
	stopMeasuringElapsedTime("ChangeMsgLanguageStart", "ChangeMsgLanguage完了");
}

function setMsgJp() {
	startMeasuringElapsedTime("setMsgJpStart");
	var clmName = "cValue3";
	I_1002 = general_lng_map["I_1002"][clmName];
	W_2001 = general_lng_map["W_2001"][clmName];
	I_1007 = general_lng_map["I_1007"][clmName];
	I_1009 = general_lng_map["I_1009"][clmName];
	I_1011 = general_lng_map["I_1011"][clmName];
	E_9003 = general_lng_map["E_9003"][clmName];
	E_9004 = general_lng_map["E_9004"][clmName];
	I_1013 = general_lng_map["I_1013"][clmName];
	I_1014 = general_lng_map["I_1014"][clmName]+"<br><span style='font-size:30px;'>"+general_lng_map["I_1014_2"][clmName]+"</span>";
	I_1015 = general_lng_map["I_1015"][clmName];
	I_1016 = general_lng_map["I_1016"][clmName];
	I_1017 = general_lng_map["I_1017"][clmName];
	I_1018 = general_lng_map["I_1018"][clmName];
	I_1019 = general_lng_map["I_1019"][clmName];
	E_9005 = general_lng_map["E_9005"][clmName];
	I_1020 = general_lng_map["I_1020"][clmName];
	I_1021 = general_lng_map["I_1021"][clmName];
	I_1022 = general_lng_map["I_1022"][clmName];
	I_1023 = general_lng_map["I_1023"][clmName];
	E_9006 = general_lng_map["E_9006"][clmName];
	W_2002 = general_lng_map["W_2002"][clmName];
	I_1024 = general_lng_map["I_1024"][clmName];
	I_1025 = general_lng_map["I_1025"][clmName];
	E_9007 = general_lng_map["E_9007"][clmName];
	I_1026 = general_lng_map["I_1026"][clmName]+"<br>　";
	I_1027 = general_lng_map["I_1027"][clmName];

	MSG_CSS_LANG = 'jp';

	MSG_COMMON_2 = general_lng_map["MSG_COMMON_2"][clmName];
	MSG_COMMON_3 = general_lng_map["MSG_COMMON_3"][clmName];
	MSG_COMMON_4 = general_lng_map["MSG_COMMON_4"][clmName];
	MSG_COMMON_5 = general_lng_map["MSG_COMMON_5"][clmName];
	MSG_COMMON_6 = general_lng_map["MSG_COMMON_6"][clmName];
	MSG_COMMON_7 = general_lng_map["MSG_COMMON_7"][clmName];
	var msgCommon7 = document.getElementsByClassName('MSG_COMMON_7');
	if(msgCommon7.length != 0){
		for(msg in msgCommon7){
			msgCommon7[msg].innerHTML = MSG_COMMON_7;
		}
	}
	MSG_COMMON_8 = general_lng_map["MSG_COMMON_8"][clmName];
	var msgCommon8 = document.getElementsByClassName('MSG_COMMON_8');
	if(msgCommon8.length != 0){
		for(msg in msgCommon8){
			msgCommon8[msg].innerHTML = MSG_COMMON_8;
		}
	}
	MSG_COMMON_9 = general_lng_map["MSG_COMMON_9"][clmName];
	document.getElementById('tableNoErrBtn').innerHTML = MSG_COMMON_9;
	MSG_COMMON_10 = general_lng_map["MSG_COMMON_10"][clmName];
	var msgCommon10 = document.getElementsByClassName('MSG_COMMON_10');
	if(msgCommon10.length != 0){
		for(msg in msgCommon10){
			msgCommon10[msg].innerHTML = MSG_COMMON_10;
		}
	}
	MSG_COMMON_11 = general_lng_map["MSG_COMMON_11"][clmName];
	document.getElementById('footer_1').innerHTML = MSG_COMMON_11;
	MSG_COMMON_12 = general_lng_map["MSG_COMMON_12"][clmName];
	document.getElementById('footer_2').innerHTML = MSG_COMMON_12;
	MSG_COMMON_13 = general_lng_map["MSG_COMMON_13"][clmName];
	document.getElementById('footer_3').innerHTML = MSG_COMMON_13;
	MSG_COMMON_14 = general_lng_map["MSG_COMMON_14"][clmName];
	document.getElementById('footer_4').innerHTML = MSG_COMMON_14;
	MSG_COMMON_15 = general_lng_map["MSG_COMMON_15"][clmName];
	MSG_COMMON_16 = general_lng_map["MSG_COMMON_16"][clmName];
	document.getElementById('alcohol_yes').innerHTML = MSG_COMMON_16;
	MSG_COMMON_17 = general_lng_map["MSG_COMMON_17"][clmName];
	document.getElementById('alcohol_no').innerHTML = MSG_COMMON_17;
	MSG_COMMON_20 = general_lng_map["MSG_COMMON_20"][clmName];
	document.getElementById('add_btn').innerHTML = MSG_COMMON_20;
	MSG_COMMON_21 = general_lng_map["MSG_COMMON_21"][clmName];
	document.getElementById('skip_btn').innerHTML = MSG_COMMON_21;
	MSG_COMMON_22 = general_lng_map["MSG_COMMON_22"][clmName];

	document.getElementById('MSG_ORDMADE_1').innerHTML = general_lng_map["MSG_ORDMADE_1"][clmName];
	document.getElementById('MSG_ORDMADE_2').innerHTML = general_lng_map["MSG_ORDMADE_2"][clmName];
	document.getElementById('MSG_ORDMADE_3').innerHTML = general_lng_map["MSG_ORDMADE_3"][clmName];
	document.getElementById('MSG_ORDMADE_4').innerHTML = general_lng_map["MSG_ORDMADE_4"][clmName];
	document.getElementById('MSG_ORDMADE_5').innerHTML = general_lng_map["MSG_ORDMADE_5"][clmName];
	document.getElementById('MSG_ORDMADE_6').lastChild.data = MSG_COMMON_15;
	MSG_ORDMADE_7 = general_lng_map["MSG_ORDMADE_7"][clmName];
	MSG_ORDMADE_7_2 = general_lng_map["MSG_ORDMADE_7_2"][clmName];
	MSG_ORDMADE_8 = MSG_COMMON_6;
	MSG_ORDMADE_9 = general_lng_map["MSG_ORDMADE_9"][clmName];
	MSG_ORDMADE_11 = MSG_COMMON_2;
	document.getElementById('dialog_ok').innerHTML = MSG_ORDMADE_11;
	document.getElementById('dialog_reset_ok').innerHTML = MSG_ORDMADE_11;
	document.getElementById('dialog_ok_ngCombi').innerHTML = MSG_ORDMADE_11;
	MSG_ORDMADE_12 = MSG_COMMON_3;
	document.getElementById('dialog_cancel').innerHTML = MSG_ORDMADE_12;
	document.getElementById('dialog_reset_cancel').innerHTML = MSG_ORDMADE_12;
	document.getElementById('dialog_cancel_ngCombi').innerHTML = MSG_ORDMADE_12;

	if(general_lng_map["MSG_ORDMADE_14"][clmName] == null || general_lng_map["MSG_ORDMADE_14"][clmName] == ""){
		var MSG_ORDMADE_14 = document.getElementById('MSG_ORDMADE_14');
		MSG_ORDMADE_14.innerHTML = "";
		MSG_ORDMADE_14.classList.add("is-hide");
		document.getElementById("cal_total_tag").classList.add("is-hide");
	} else {
		var MSG_ORDMADE_14 = document.getElementById('MSG_ORDMADE_14');
		MSG_ORDMADE_14.innerHTML = general_lng_map["MSG_ORDMADE_14"][clmName];
		MSG_ORDMADE_14.classList.remove("is-hide");
		document.getElementById("cal_total_tag").classList.remove("is-hide");
	}

	if(general_lng_map["MSG_ORDMADE_15"][clmName] == null || general_lng_map["MSG_ORDMADE_15"][clmName] == ""){
		var MSG_ORDMADE_15 = document.getElementById('MSG_ORDMADE_15');
		MSG_ORDMADE_15.innerHTML = "";
		MSG_ORDMADE_15.classList.add("is-hide");
		document.getElementById("salt_total_tag").classList.add("is-hide");
	} else {
		var MSG_ORDMADE_15 = document.getElementById('MSG_ORDMADE_15');
		MSG_ORDMADE_15.innerHTML = general_lng_map["MSG_ORDMADE_15"][clmName];
		MSG_ORDMADE_15.classList.remove("is-hide");
		document.getElementById("salt_total_tag").classList.remove("is-hide");
	}
	document.getElementById('MSG_ORDMADE_16').innerHTML = general_lng_map["MSG_ORDMADE_16"][clmName];
	document.getElementById('MSG_ORDMADE_17').innerHTML = general_lng_map["MSG_ORDMADE_17"][clmName];
	document.getElementById('MSG_ORDMADE_18').innerHTML = general_lng_map["MSG_ORDMADE_18"][clmName];
	document.getElementById('MSG_ORDMADE_19').innerHTML = general_lng_map["MSG_ORDMADE_19"][clmName];
	document.getElementById('MSG_ORDMADE_20').innerHTML = general_lng_map["MSG_ORDMADE_20"][clmName];
	document.getElementById('MSG_ORDMADE_21').innerHTML = general_lng_map["MSG_ORDMADE_21"][clmName];
	document.getElementById('MSG_ORDMADE_22').innerHTML = general_lng_map["MSG_ORDMADE_22"][clmName];
	document.getElementById('MSG_ORDMADE_23').innerHTML = general_lng_map["MSG_ORDMADE_23"][clmName];
	document.getElementById('MSG_ORDMADE_24').innerHTML = general_lng_map["MSG_ORDMADE_24"][clmName];
	document.getElementById('MSG_ORDMADE_25').innerHTML = general_lng_map["MSG_ORDMADE_24"][clmName];
	document.getElementById('MSG_ORDMADE_26').innerHTML = general_lng_map["MSG_ORDMADE_26"][clmName];
	document.getElementById('MSG_ORDMADE_27').innerHTML = general_lng_map["MSG_ORDMADE_27"][clmName];

	document.getElementById('MSG_ORDMADE_29').style.lineHeight = '24px';

	document.getElementById('MSG_ORDMADE_29_general').style.lineHeight = document.getElementById('MSG_ORDMADE_29').style.lineHeight;
	document.getElementById('MSG_ORDMADE_29_general').style.height = '34%';
	document.getElementById('aller-bottom').style.top = '200px';
	document.getElementById('MSG_ORDMADE_29_general').innerHTML = "<br>"+general_lng_map["MSG_ORDMADE_29_general"][clmName];

	MSG_ORDMADE_37 = general_lng_map["MSG_ORDMADE_37"][clmName];
	MSG_ORDMADE_37_2 = general_lng_map["MSG_ORDMADE_37_2"][clmName];
	document.getElementById('ordmade_guide_msg').innerHTML = MSG_ORDMADE_37;
	document.getElementById('aller-staff-msg').innerHTML = general_lng_map["aller-staff-msg"][clmName];

	MSG_ORDMADE_38 = general_lng_map["MSG_ORDMADE_38"][clmName];
	document.getElementById('MSG_ORDMADE_38').innerHTML = MSG_ORDMADE_38;
	document.getElementById('MSG_ORDMADE_38').style.lineHeight = "2.0";

	MSG_GENERAL_2 = MSG_COMMON_15;
	document.getElementById('MSG_GENERAL_3').innerHTML = general_lng_map["MSG_GENERAL_3"][clmName];
	document.getElementById('MSG_GENERAL_4').innerHTML = general_lng_map["MSG_GENERAL_4"][clmName];
	document.getElementById('MSG_GENERAL_14').innerHTML = general_lng_map["MSG_GENERAL_14"][clmName];
	document.getElementById('MSG_GENERAL_15').innerHTML = general_lng_map["MSG_GENERAL_15"][clmName];
	document.getElementById('MSG_GENERAL_6').innerHTML = general_lng_map["MSG_GENERAL_6"][clmName];
	MSG_GENERAL_7 = MSG_COMMON_5;
	document.getElementById('aller_close').innerHTML = MSG_GENERAL_7;
	document.getElementById('MSG_GENERAL_8').innerHTML = general_lng_map["MSG_GENERAL_8"][clmName];

	MSG_GENERAL_10 = general_lng_map["MSG_GENERAL_10"][clmName];
	MSG_GENERAL_13 = general_lng_map["MSG_GENERAL_13"][clmName];
	MSG_GENERAL_14_2 = general_lng_map["MSG_GENERAL_14_2"][clmName];

	MSG_DRINK_2 = MSG_COMMON_15;
	MSG_DRINK_3 = general_lng_map["MSG_DRINK_3"][clmName];
	MSG_DRINK_4 = general_lng_map["MSG_DRINK_4"][clmName];
	document.getElementById('MSG_DRINK_5').innerHTML = general_lng_map["MSG_DRINK_5"][clmName];
	MSG_DRINK_6 = general_lng_map["MSG_DRINK_6"][clmName];

	MSG_CART_1 = general_lng_map["MSG_CART_1"][clmName];
	MSG_CART_2 = general_lng_map["MSG_CART_2"][clmName];
	document.getElementById('confText').innerHTML = MSG_CART_2;
	MSG_CART_3 = general_lng_map["MSG_CART_3"][clmName];
	MSG_CART_4 = MSG_COMMON_4;
	MSG_CART_5 = general_lng_map["MSG_CART_5"][clmName];
	document.getElementById('ord_fix').style.fontSize = '34px';
	document.getElementById('ord_fix').style.lineHeight = '2.7';
	document.getElementById('ord_fix').innerHTML = MSG_CART_5;
	MSG_CART_6 = general_lng_map["MSG_CART_6"][clmName];
	document.getElementById('anotherOrderBtn').innerHTML = MSG_CART_6;
	MSG_CART_7 = general_lng_map["MSG_CART_7"][clmName];
	document.getElementById('caution_text').innerHTML = MSG_CART_7;
	MSG_CART_8 = general_lng_map["MSG_CART_8"][clmName];
	document.getElementById('cart_goods_name').innerHTML = MSG_CART_8;
	MSG_CART_9 = general_lng_map["MSG_CART_9"][clmName];
	document.getElementById('singlePriceTag').innerHTML = MSG_CART_9;
	MSG_CART_10 = general_lng_map["MSG_CART_10"][clmName];
	document.getElementById('cart_qnt').innerHTML = MSG_CART_10;
	MSG_CART_11 = general_lng_map["MSG_CART_11"][clmName];
	document.getElementById('cart_subtotal').innerHTML = MSG_CART_11;
	MSG_CART_12 = general_lng_map["MSG_CART_12"][clmName];
	document.getElementById('accoutDelTag').innerHTML = MSG_CART_12;
	MSG_CART_13 = MSG_COMMON_6;
	MSG_CART_14 = general_lng_map["MSG_CART_14"][clmName];
	MSG_CART_15 = general_lng_map["MSG_CART_15"][clmName];
	MSG_CART_17 = general_lng_map["MSG_CART_17"][clmName];
	document.getElementById('accountReturnBtn').innerHTML = MSG_CART_17;
	MSG_CART_18 = general_lng_map["MSG_CART_18"][clmName];
	MSG_CART_19 = "<br>"+general_lng_map["MSG_CART_19"][clmName];
	MSG_CART_20 = general_lng_map["MSG_CART_20"][clmName];
	MSG_CART_21 = general_lng_map["MSG_CART_21"][clmName];
	MSG_CART_22 = general_lng_map["MSG_CART_22"][clmName];
	document.getElementById('s-dialog22_1').innerHTML = MSG_CART_22;
	MSG_CART_23 = general_lng_map["MSG_CART_23"][clmName];
	document.getElementById('s-dialog22_2').innerHTML = MSG_CART_23;
	document.getElementById('s-dialog22_2').style.left = '0%';
	MSG_CART_24 = general_lng_map["MSG_CART_24"][clmName];
	document.getElementById('s-dialog22_3').innerHTML = MSG_CART_24.replace('{0}', '5');
	MSG_CART_25 = general_lng_map["MSG_CART_25"][clmName];
	document.getElementById('s-dialog22_4').innerHTML = MSG_CART_25;
	MSG_CART_26 = general_lng_map["MSG_CART_26"][clmName];
	document.getElementById('s-dialog22_5').innerHTML = MSG_CART_26;
	MSG_CART_27 = general_lng_map["MSG_CART_27"][clmName];
	document.getElementById('s-dialog22_6').innerHTML = MSG_CART_27;
	document.getElementById('s-dialog22_6').style.lineHeight = '29px';
	MSG_CART_27_2 = general_lng_map["MSG_CART_27_2"][clmName];
	document.getElementById('s-dialog22_7').innerHTML = MSG_CART_27_2;
	document.getElementById('s-dialog22_7').style.lineHeight = '30px';
	document.getElementById('s-dialog22_7').style.top = '47%';
	MSG_CART_28 = general_lng_map["MSG_CART_28"][clmName];
	document.getElementById('s-dialog22_8').style.top = '60.25%';
	document.getElementById('s-dialog22_8').style.fontSize = '35px';
	document.getElementById('s-dialog22_8').innerHTML = 0+MSG_CART_28;
	document.getElementById('s-dialog22_9').style.top = '60.25%';
	document.getElementById('s-dialog22_9').style.fontSize = '35px';
	document.getElementById('s-dialog22_9').innerHTML = 0+MSG_CART_28;
	MSG_CART_29 = general_lng_map["MSG_CART_29"][clmName];
	document.getElementById('regBag_noBag').innerHTML = MSG_CART_29;
	MSG_CART_30 = general_lng_map["MSG_CART_30"][clmName];
	document.getElementById('regBag_decision').innerHTML = MSG_CART_30;
	MSG_CART_31 = general_lng_map["MSG_CART_31"][clmName];

	document.getElementById('MSG_HOME_1').innerHTML = general_lng_map["MSG_HOME_1"][clmName];
	document.getElementById('MSG_HOME_1').style.top = '35%';
	document.getElementById('MSG_HOME_2').innerHTML = general_lng_map["MSG_HOME_2"][clmName];
	document.getElementById('MSG_HOME_3').innerHTML = general_lng_map["MSG_HOME_3"][clmName];

	document.getElementById('MSG_PEOPLE_1').innerHTML = general_lng_map["MSG_PEOPLE_1"][clmName];
	MSG_PEOPLE_2 = general_lng_map["MSG_PEOPLE_2"][clmName];
	document.getElementById('s-dialog3-btn').innerHTML = MSG_PEOPLE_2;
	stopMeasuringElapsedTime("setMsgJpStart", "setMsgJp完了");
}

function setMsgEn(){
	startMeasuringElapsedTime("setMsgEnStart");
	var clmName = "cValue4";
	I_1002 = general_lng_map["I_1002"][clmName];
	W_2001 = general_lng_map["W_2001"][clmName];
	I_1007 = general_lng_map["I_1007"][clmName];
	I_1009 = general_lng_map["I_1009"][clmName];
	I_1011 = general_lng_map["I_1011"][clmName];
	E_9003 = general_lng_map["E_9003"][clmName];
	E_9004 = general_lng_map["E_9004"][clmName];
	I_1013 = general_lng_map["I_1013"][clmName];
	I_1014 = general_lng_map["I_1014"][clmName]+"<br><span style='font-size:30px;'>"+general_lng_map["I_1014_2"][clmName]+"</span>";
	I_1015 = general_lng_map["I_1015"][clmName];
	I_1016 = general_lng_map["I_1016"][clmName];
	I_1017 = general_lng_map["I_1017"][clmName];
	I_1018 = general_lng_map["I_1018"][clmName];
	I_1019 = general_lng_map["I_1019"][clmName];
	E_9005 = general_lng_map["E_9005"][clmName];
	I_1020 = general_lng_map["I_1020"][clmName];
	I_1021 = general_lng_map["I_1021"][clmName];
	I_1022 = general_lng_map["I_1022"][clmName];
	I_1023 = general_lng_map["I_1023"][clmName];
	E_9006 = general_lng_map["E_9006"][clmName];
	W_2002 = general_lng_map["W_2002"][clmName];
	I_1024 = general_lng_map["I_1024"][clmName];
	I_1025 = general_lng_map["I_1025"][clmName];
	E_9007 = general_lng_map["E_9007"][clmName];
	I_1026 = general_lng_map["I_1026"][clmName]+"<br />　";
	I_1027 = general_lng_map["I_1027"][clmName];

	MSG_CSS_LANG = 'en';

	MSG_COMMON_2 = general_lng_map["MSG_COMMON_2"][clmName];
	MSG_COMMON_3 = general_lng_map["MSG_COMMON_3"][clmName];
	MSG_COMMON_4 = general_lng_map["MSG_COMMON_4"][clmName];
	MSG_COMMON_5 = general_lng_map["MSG_COMMON_5"][clmName];
	MSG_COMMON_6 = general_lng_map["MSG_COMMON_6"][clmName];
	MSG_COMMON_7 = general_lng_map["MSG_COMMON_7"][clmName];
	var msgCommon7 = document.getElementsByClassName('MSG_COMMON_7');
	if(msgCommon7.length != 0){
		for(msg in msgCommon7){
			msgCommon7[msg].innerHTML = MSG_COMMON_7;
		}
	}
	MSG_COMMON_8 = general_lng_map["MSG_COMMON_8"][clmName];
	var msgCommon8 = document.getElementsByClassName('MSG_COMMON_8');
	if(msgCommon8.length != 0){
		for(msg in msgCommon8){
			msgCommon8[msg].innerHTML = MSG_COMMON_8;
		}
	}
	MSG_COMMON_9 = general_lng_map["MSG_COMMON_9"][clmName];
	document.getElementById('tableNoErrBtn').innerHTML = MSG_COMMON_9;
	MSG_COMMON_10 = general_lng_map["MSG_COMMON_10"][clmName];
	var msgCommon10 = document.getElementsByClassName('MSG_COMMON_10');
	if(msgCommon10.length != 0){
		for(msg in msgCommon10){
			msgCommon10[msg].innerHTML = MSG_COMMON_10;
		}
	}
	MSG_COMMON_11 = general_lng_map["MSG_COMMON_11"][clmName];
	document.getElementById('footer_1').innerHTML = MSG_COMMON_11;
	MSG_COMMON_12 = general_lng_map["MSG_COMMON_12"][clmName];
	document.getElementById('footer_2').innerHTML = MSG_COMMON_12;
	MSG_COMMON_13 = general_lng_map["MSG_COMMON_13"][clmName];
	document.getElementById('footer_3').innerHTML = MSG_COMMON_13;
	MSG_COMMON_14 = general_lng_map["MSG_COMMON_14"][clmName];
	document.getElementById('footer_4').innerHTML = MSG_COMMON_14;
	MSG_COMMON_15 = general_lng_map["MSG_COMMON_15"][clmName];
	MSG_COMMON_16 = general_lng_map["MSG_COMMON_16"][clmName];
	document.getElementById('alcohol_yes').innerHTML = MSG_COMMON_16;
	MSG_COMMON_17 = general_lng_map["MSG_COMMON_17"][clmName];
	document.getElementById('alcohol_no').innerHTML = MSG_COMMON_17;
	MSG_COMMON_20 = general_lng_map["MSG_COMMON_20"][clmName];
	document.getElementById('add_btn').innerHTML = MSG_COMMON_20;
	MSG_COMMON_21 = general_lng_map["MSG_COMMON_21"][clmName];
	document.getElementById('skip_btn').innerHTML = MSG_COMMON_21;
	MSG_COMMON_22 = general_lng_map["MSG_COMMON_22"][clmName];

	document.getElementById('MSG_ORDMADE_1').innerHTML = general_lng_map["MSG_ORDMADE_1"][clmName];
	document.getElementById('MSG_ORDMADE_2').innerHTML = general_lng_map["MSG_ORDMADE_2"][clmName];
	document.getElementById('MSG_ORDMADE_3').innerHTML = general_lng_map["MSG_ORDMADE_3"][clmName];
	document.getElementById('MSG_ORDMADE_4').innerHTML = general_lng_map["MSG_ORDMADE_4"][clmName];
	document.getElementById('MSG_ORDMADE_5').innerHTML = general_lng_map["MSG_ORDMADE_5"][clmName];
	document.getElementById('MSG_ORDMADE_6').lastChild.data = MSG_COMMON_15;
	MSG_ORDMADE_7 = general_lng_map["MSG_ORDMADE_7"][clmName];
	MSG_ORDMADE_7_2 = general_lng_map["MSG_ORDMADE_7_2"][clmName];
	MSG_ORDMADE_8 = MSG_COMMON_6;
	MSG_ORDMADE_9 = general_lng_map["MSG_ORDMADE_9"][clmName];
	MSG_ORDMADE_11 = MSG_COMMON_2;
	document.getElementById('dialog_ok').innerHTML = MSG_ORDMADE_11;
	document.getElementById('dialog_reset_ok').innerHTML = MSG_ORDMADE_11;
	document.getElementById('dialog_ok_ngCombi').innerHTML = MSG_ORDMADE_11;
	MSG_ORDMADE_12 = MSG_COMMON_3;
	document.getElementById('dialog_cancel').innerHTML = MSG_ORDMADE_12;
	document.getElementById('dialog_reset_cancel').innerHTML = MSG_ORDMADE_12;
	document.getElementById('dialog_cancel_ngCombi').innerHTML = MSG_ORDMADE_12;

	if(general_lng_map["MSG_ORDMADE_14"][clmName] == null || general_lng_map["MSG_ORDMADE_14"][clmName] == ""){
		var MSG_ORDMADE_14 = document.getElementById('MSG_ORDMADE_14');
		MSG_ORDMADE_14.innerHTML = "";
		MSG_ORDMADE_14.classList.add("is-hide");
		document.getElementById("cal_total_tag").classList.add("is-hide");
	} else {
		var MSG_ORDMADE_14 = document.getElementById('MSG_ORDMADE_14');
		MSG_ORDMADE_14.innerHTML = general_lng_map["MSG_ORDMADE_14"][clmName];
		MSG_ORDMADE_14.classList.remove("is-hide");
		document.getElementById("cal_total_tag").classList.remove("is-hide");
	}

	if(general_lng_map["MSG_ORDMADE_15"][clmName] == null || general_lng_map["MSG_ORDMADE_15"][clmName] == ""){
		var MSG_ORDMADE_15 = document.getElementById('MSG_ORDMADE_15');
		MSG_ORDMADE_15.innerHTML = "";
		MSG_ORDMADE_15.classList.add("is-hide");
		document.getElementById("salt_total_tag").classList.add("is-hide");
	} else {
		var MSG_ORDMADE_15 = document.getElementById('MSG_ORDMADE_15');
		MSG_ORDMADE_15.innerHTML = general_lng_map["MSG_ORDMADE_15"][clmName];
		MSG_ORDMADE_15.classList.remove("is-hide");
		document.getElementById("salt_total_tag").classList.remove("is-hide");
	}
	document.getElementById('MSG_ORDMADE_16').innerHTML = general_lng_map["MSG_ORDMADE_16"][clmName];
	document.getElementById('MSG_ORDMADE_17').innerHTML = general_lng_map["MSG_ORDMADE_17"][clmName];
	document.getElementById('MSG_ORDMADE_18').innerHTML = general_lng_map["MSG_ORDMADE_18"][clmName];
	document.getElementById('MSG_ORDMADE_19').innerHTML = general_lng_map["MSG_ORDMADE_19"][clmName];
	document.getElementById('MSG_ORDMADE_20').innerHTML = general_lng_map["MSG_ORDMADE_20"][clmName];
	document.getElementById('MSG_ORDMADE_21').innerHTML = general_lng_map["MSG_ORDMADE_21"][clmName];
	document.getElementById('MSG_ORDMADE_22').innerHTML = general_lng_map["MSG_ORDMADE_22"][clmName];
	document.getElementById('MSG_ORDMADE_23').innerHTML = general_lng_map["MSG_ORDMADE_23"][clmName];
	document.getElementById('MSG_ORDMADE_24').innerHTML = general_lng_map["MSG_ORDMADE_24"][clmName];
	document.getElementById('MSG_ORDMADE_25').innerHTML = general_lng_map["MSG_ORDMADE_24"][clmName];
	document.getElementById('MSG_ORDMADE_26').innerHTML = general_lng_map["MSG_ORDMADE_26"][clmName];
	document.getElementById('MSG_ORDMADE_27').innerHTML = general_lng_map["MSG_ORDMADE_27"][clmName];

	document.getElementById('MSG_ORDMADE_29_general').style.lineHeight = '24px';
	document.getElementById('MSG_ORDMADE_29_general').style.height = '51%';
	document.getElementById('aller-bottom').style.top = '300px';
	document.getElementById('MSG_ORDMADE_29_general').innerHTML = "<br>"+general_lng_map["MSG_ORDMADE_29_general"][clmName];

	MSG_ORDMADE_37 = general_lng_map["MSG_ORDMADE_37"][clmName];
	MSG_ORDMADE_37_2 = general_lng_map["MSG_ORDMADE_37_2"][clmName];
	document.getElementById('ordmade_guide_msg').innerHTML = MSG_ORDMADE_37;
	document.getElementById('aller-staff-msg').innerHTML = general_lng_map["aller-staff-msg"][clmName];

	MSG_ORDMADE_38 = general_lng_map["MSG_ORDMADE_38"][clmName];
	document.getElementById('MSG_ORDMADE_38').innerHTML = MSG_ORDMADE_38;
	document.getElementById('MSG_ORDMADE_38').style.lineHeight = "1.1";

	MSG_GENERAL_2 = MSG_COMMON_15;
	document.getElementById('MSG_GENERAL_3').innerHTML = general_lng_map["MSG_GENERAL_3"][clmName];
	document.getElementById('MSG_GENERAL_4').innerHTML = general_lng_map["MSG_GENERAL_4"][clmName];
	document.getElementById('MSG_GENERAL_14').innerHTML = general_lng_map["MSG_GENERAL_14"][clmName];
	document.getElementById('MSG_GENERAL_15').innerHTML = general_lng_map["MSG_GENERAL_15"][clmName];
	document.getElementById('MSG_GENERAL_6').innerHTML = general_lng_map["MSG_GENERAL_6"][clmName];
	MSG_GENERAL_7 = MSG_COMMON_5;
	document.getElementById('aller_close').innerHTML = MSG_GENERAL_7;
	document.getElementById('MSG_GENERAL_8').innerHTML = general_lng_map["MSG_GENERAL_8"][clmName];

	MSG_GENERAL_10 = general_lng_map["MSG_GENERAL_10"][clmName];
	MSG_GENERAL_13 = general_lng_map["MSG_GENERAL_13"][clmName];
	MSG_GENERAL_14_2 = general_lng_map["MSG_GENERAL_14_2"][clmName];

	MSG_DRINK_2 = MSG_COMMON_15;
	MSG_DRINK_3 = general_lng_map["MSG_DRINK_3"][clmName];
	MSG_DRINK_4 = general_lng_map["MSG_DRINK_4"][clmName];
	document.getElementById('MSG_DRINK_5').innerHTML = general_lng_map["MSG_DRINK_5"][clmName];
	MSG_DRINK_6 = general_lng_map["MSG_DRINK_6"][clmName];

	MSG_CART_1 = general_lng_map["MSG_CART_1"][clmName];
	MSG_CART_2 = general_lng_map["MSG_CART_2"][clmName];
	document.getElementById('confText').innerHTML = MSG_CART_2;
	MSG_CART_3 = general_lng_map["MSG_CART_3"][clmName];
	MSG_CART_4 = MSG_COMMON_4;
	MSG_CART_5 = general_lng_map["MSG_CART_5"][clmName];
	document.getElementById('ord_fix').style.fontSize = '26px';
	document.getElementById('ord_fix').style.lineHeight = '3.4';
	document.getElementById('ord_fix').innerHTML = MSG_CART_5;
	MSG_CART_6 = general_lng_map["MSG_CART_6"][clmName];
	document.getElementById('anotherOrderBtn').innerHTML = MSG_CART_6;
	MSG_CART_7 = general_lng_map["MSG_CART_7"][clmName];
	document.getElementById('caution_text').innerHTML = MSG_CART_7;
	MSG_CART_8 = general_lng_map["MSG_CART_8"][clmName];
	document.getElementById('cart_goods_name').innerHTML = MSG_CART_8;
	MSG_CART_9 = general_lng_map["MSG_CART_9"][clmName];
	document.getElementById('singlePriceTag').innerHTML = MSG_CART_9;
	MSG_CART_10 = general_lng_map["MSG_CART_10"][clmName];
	document.getElementById('cart_qnt').innerHTML = MSG_CART_10;
	MSG_CART_11 = general_lng_map["MSG_CART_11"][clmName];
	document.getElementById('cart_subtotal').innerHTML = MSG_CART_11;
	MSG_CART_12 = general_lng_map["MSG_CART_12"][clmName];
	document.getElementById('accoutDelTag').innerHTML = MSG_CART_12;
	MSG_CART_13 = MSG_COMMON_6;
	MSG_CART_14 = general_lng_map["MSG_CART_14"][clmName];
	MSG_CART_15 = general_lng_map["MSG_CART_15"][clmName];
	MSG_CART_17 = general_lng_map["MSG_CART_17"][clmName];
	document.getElementById('accountReturnBtn').innerHTML = MSG_CART_17;
	MSG_CART_18 = general_lng_map["MSG_CART_18"][clmName];
	MSG_CART_19 = "<br>"+general_lng_map["MSG_CART_19"][clmName];
	MSG_CART_20 = general_lng_map["MSG_CART_20"][clmName];
	MSG_CART_21 = general_lng_map["MSG_CART_21"][clmName];
	MSG_CART_22 = general_lng_map["MSG_CART_22"][clmName];
	document.getElementById('s-dialog22_1').innerHTML = MSG_CART_22;
	MSG_CART_23 = general_lng_map["MSG_CART_23"][clmName];
	document.getElementById('s-dialog22_2').innerHTML = MSG_CART_23;
	document.getElementById('s-dialog22_2').style.left = '-8%';
	MSG_CART_24 = general_lng_map["MSG_CART_24"][clmName];
	document.getElementById('s-dialog22_3').innerHTML = MSG_CART_24.replace('{0}', '5');
	MSG_CART_25 = general_lng_map["MSG_CART_25"][clmName];
	document.getElementById('s-dialog22_4').innerHTML = MSG_CART_25;
	MSG_CART_26 = general_lng_map["MSG_CART_26"][clmName];
	document.getElementById('s-dialog22_5').innerHTML = MSG_CART_26;
	MSG_CART_27 = general_lng_map["MSG_CART_27"][clmName];
	document.getElementById('s-dialog22_6').innerHTML = MSG_CART_27;
	document.getElementById('s-dialog22_6').style.lineHeight = '28px';
	MSG_CART_27_2 = general_lng_map["MSG_CART_27_2"][clmName];
	document.getElementById('s-dialog22_7').innerHTML = MSG_CART_27_2;
	document.getElementById('s-dialog22_7').style.lineHeight = '22px';
	document.getElementById('s-dialog22_7').style.top = '48%';
	MSG_CART_28 = general_lng_map["MSG_CART_28"][clmName];
	document.getElementById('s-dialog22_8').style.top = '60.75%';
	document.getElementById('s-dialog22_8').style.fontSize = '30px';
	document.getElementById('s-dialog22_8').innerHTML = 0+MSG_CART_28;
	document.getElementById('s-dialog22_9').style.top = '60.75%';
	document.getElementById('s-dialog22_9').style.fontSize = '30px';
	document.getElementById('s-dialog22_9').innerHTML = 0+MSG_CART_28;
	MSG_CART_29 = general_lng_map["MSG_CART_29"][clmName];
	document.getElementById('regBag_noBag').innerHTML = MSG_CART_29;
	MSG_CART_30 = general_lng_map["MSG_CART_30"][clmName];
	document.getElementById('regBag_decision').innerHTML = MSG_CART_30;
	MSG_CART_31 = general_lng_map["MSG_CART_31"][clmName];

	document.getElementById('MSG_HOME_1').innerHTML = general_lng_map["MSG_HOME_1"][clmName];
	document.getElementById('MSG_HOME_1').style.top = '25%';
	document.getElementById('MSG_HOME_2').innerHTML = general_lng_map["MSG_HOME_2"][clmName];
	document.getElementById('MSG_HOME_3').innerHTML = general_lng_map["MSG_HOME_3"][clmName];

	document.getElementById('MSG_PEOPLE_1').innerHTML = general_lng_map["MSG_PEOPLE_1"][clmName];
	MSG_PEOPLE_2 = general_lng_map["MSG_PEOPLE_2"][clmName];
	document.getElementById('s-dialog3-btn').innerHTML = MSG_PEOPLE_2;
	stopMeasuringElapsedTime("setMsgEnStart", "setMsgEn完了");
}

function setMsgKr(){
	startMeasuringElapsedTime("setMsgKrStart");
	MSG_CSS_LANG = 'kr';
	stopMeasuringElapsedTime("setMsgKrStart", "setMsgKr完了");
}

function setMsgCn(){
	startMeasuringElapsedTime("setMsgCnStart");
	MSG_CSS_LANG = 'cn';
	stopMeasuringElapsedTime("setMsgCnStart", "setMsgCn完了");
}

/**
 * 言語設定取得処理
 */
function getMsgLanguage(){
	outOparationLog("アプリ起動-言語設定取得開始");
	var timeoutFlg = false;

	// タイムアウト処理
	setTimeout(function(){
		if(!(timeoutFlg)){
			timeoutFlg = true;
			// リトライ処理に変更
			getMsgLanguage();
            return;
		}
	},POST_TIMEOUT_TIME);

    // 非同期通信で設定時間を取得
	$.when(
        $.ajax({
            type:'POST',
            url:PHP_EN_ROOT_FOLDER + '/getGenericMaster.php',
            data:{
                'fName':'message',
                'uName':'text'
            },
            success:function(data){
                // 結果をJSON形式で取得
				generic_lng_json = data;
				data = null;
				if((generic_lng_json === false || generic_lng_json === '') && !(timeoutFlg)){
                    timeoutFlg = true;
					// リトライ処理に変更
					getMsgLanguage();
					return;
				}
            }
        })
	).done(function() {
		// 非同期通信の完了を監視
		if(generic_lng_json != false && generic_lng_json != '' && !(timeoutFlg)){
			timeoutFlg = true;
			outOparationLog("アプリ起動-言語設定取得終了");
			console.log("アプリ起動-言語設定取得終了");
			var tmpMap = JSON.parse(generic_lng_json);
			for(var tm in tmpMap){
				general_lng_map[tmpMap[tm]["cValue1"]] = tmpMap[tm];
			}

			ChangeMsgLanguage('jp');
			getLayoutDataFst();
			firstTimeoutFlg = false;
			window.removeEventListener('error',loadError);
			window.removeEventListener('onerror',loadError);
		}else{
			timeoutFlg = true;
		}
	})
}
