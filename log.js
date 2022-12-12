var elapsedTimeList = [];

const FORCED_SEND_ELAPSED_TIME_INTERVAL =  10000;
setInterval(forcedSendElapsedTime, FORCED_SEND_ELAPSED_TIME_INTERVAL);
//setInterval(forcedSendOperationLog, FORCED_SEND_ELAPSED_TIME_INTERVAL);
/**
 * 処理時間計測・出力処理
 */
function forcedSendElapsedTime() {
	if (elapsedTimeList.length > 0) {
		var opeMsg = "";
		for(elapsedTime of elapsedTimeList) {
			opeMsg += elapsedTime + '\r\n';
		}
		writingElapsedTime(opeMsg);
		elapsedTimeList.splice(0);
	}
}

function forcedSendOperationLog() {
	if (operationLogList.length > 0) {
		var opeMsg = "";
		for(operationLog of operationLogList) {
			opeMsg += operationLog + '\r\n';
		}
	}
	writingOperationLog(opeMsg);
	operationLogList.splice(0);
}


/**
 * 処理時間計測開始 
 * @param {string} startMarker: 計測開始マーカー名
 */
function startMeasuringElapsedTime(startMarker) {
	const checkExistance = performance.getEntriesByName(startMarker);
	if(checkExistance.length == 0) {
		// 存在しない場合のみ計測スタート地点をとる
		// 再起対策
  	performance.mark(startMarker);
	}
}

/**
 * 
 * @param {string} startMarker: 計測開始マーカー
 * @param {string} measuringName: 処理時間計測結果名
 * @returns 
 */
function stopMeasuringElapsedTime(startMarker, measuringName) {
	try {
  	performance.measure(measuringName, startMarker);
	} catch (error) {
		const errorMessage = makeFatalErrorSentence(measuringName) + error;
		setElapsedTimeList(errorMessage);
		return false;
	}

  var elapsedTime = performance.getEntriesByName(measuringName);

	// 整理 
	performance.clearMarks(startMarker);
	performance.clearMeasures(measuringName);

	// 書きこむ形に成形
	elapsedTime = elapsedTime[0].duration.toPrecision(5);

	const message = makeElapsedTimeLogSentence(elapsedTime, measuringName);

  // 計測結果書き込みリストに格納
	setElapsedTimeList(message);
}

/**
 * 処理時間計測ログの文作成 
 * @param {Number} elapsedTime 
 * @param {string} measuringName 
 * @returns {string}
 */
function makeElapsedTimeLogSentence(elapsedTime, measuringName) {
	const prefix = makePrefix(elapsedTime);

	// 現在日時取得
	const currentDateTimeStr = makeCurrentDateTimeStr();

	const sentence = "[" + prefix + "]" + currentDateTimeStr
		+ measuringName + ":" + elapsedTime + "[ms]";

	return sentence;
}

/**
 * 処理が中断してしまうようなエラー発生時にログ書き込み 
 * @param {string} log: logファイルに書き込みたい内容
 * @returns {string} logファイルに書き込む文
 */
function makeFatalErrorSentence(log) {
	const prefix = "[FatalError]";
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr + log;
	return sentence;
}

/**
 * logファイル書き込み用に現在時刻を整形 
 * @returns {string} 現在時刻
 */
function makeCurrentDateTimeStr() {
	const currentDateTime = new Date();
	const year = currentDateTime.getFullYear();
	const month = ('0' + String(currentDateTime.getMonth()+1)).slice(-2);
	const date = ('0' + currentDateTime.getDate()).slice(-2);
	const hours = ('0' + currentDateTime.getHours()).slice(-2);
	const minutes = ('0' + currentDateTime.getMinutes()).slice(-2);
	const seconds = ('0' + currentDateTime.getSeconds()).slice(-2);
	const millisec = ('00' + currentDateTime.getMilliseconds()).slice(-3);

	const currentDateTimeStr = '[' + year + '-' + month + '-' + date + ' '
		+ hours + ':' + minutes + ':' + seconds + "." + millisec + ']';

	return currentDateTimeStr; 
}

/**
 * 処理時間によって表示内容を変更 
 * @param {Number} elapsedTime 
 * @returns {string} 
 */
function makePrefix(elapsedTime) {
	if(elapsedTime <= 10) {
		return "Log       ";
	} else if(10 < elapsedTime && elapsedTime <= 100) {
		return "Alert100  ";
	} else if(100 < elapsedTime && elapsedTime <= 1000) {
		return "Alert1000 ";
	} else if(1000 < elapsedTime && elapsedTime <= 2000) {
		return "Alert2000 ";
	} else if(2000 < elapsedTime && elapsedTime <= 3000) {
		return "Alert3000 ";
	} else if(3000 < elapsedTime && elapsedTime <= 4000) {
		return "Alert4000 ";
	} else if(4000 < elapsedTime && elapsedTime <= 5000) {
		return "Alert5000 ";
	} else {
		return "Error     ";
	}
}

/**
 * 処理時間以外のログを書き込む 
 * @param {} prefix 
 * @param {*} message 
 */
function additionMessage(prefix, message) {
  const prefix = "[Log       ]";
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr + message; 
	setElapsedTimeList(sentence);
}

/**
 * basedishcombo用ログファイル書き込み関数, 連続で書き込ませる 
 * @param {list} messages 
 */
function additionMessagesForBaseDishCombo(messages) {
	prefix = "[basedish  ]"
	const currentDateTimeStr = makeCurrentDateTimeStr();
	for (var i in messages) {
		// まとめて追加
		elapsedTimeList.push(prefix + currentDateTimeStr + messages[i])

	}
}

/**
 * チェックイン処理開始時刻マーク
 */
function recordStartCheckIn() {
	const prefix = "[Start     ]";
	const message = "チェックイン開始";
	additionMessage(prefix, message);
}

/**
 * 人数入力ボタン押下後～ホームシーン遷移完了時間計測
 * @returns
 */
function recordStopCheckIn() {
	try {
  	performance.measure("stopCheckIn", "touchPeopleBtn");
	} catch (error) {
		const errorMessage = makeFatalErrorSentence("stopCheckIn") + error;
		setElapsedTimeList(errorMessage);
		return false;
	}

  var elapsedTime = performance.getEntriesByName("stopCheckIn");

	// 整理 
	performance.clearMarks("touchPeopleBtn");
	performance.clearMeasures("stopCheckIn");

	// 書きこむ形に成形
	elapsedTime = elapsedTime[0].duration.toPrecision(5);

	const prefix = "[Stop      ]";
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const sentence = prefix + currentDateTimeStr
		+ "チェックイン終了" + ":" + elapsedTime + "[ms]";

	setElapsedTimeList(sentence);
}

// リトライ発生(タイムアウトにより) 時間計測は行わない。リトライ発生のみログファイルに書き込む
// 廃止予定
function timeoutRetryOccur(occurrencePlace) {
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const message = occurrencePlace + ":タイムオーバーによりリトライ";
	const sentence = "[Log       ]" + currentDateTimeStr + message;
	setElapsedTimeList(sentence);
}

// リトライ発生(データ取得失敗により) 時間計測は行わない。リトライ発生のみログファイルに書き込む
// 廃止予定
function failureRetryOcuur(occurrencePlace) {
	const currentDateTimeStr = makeCurrentDateTimeStr();
	const message = occurrencePlace + ":データ取得失敗によりリトライ";
	const sentence = "[Log       ]" + currentDateTimeStr + message;
	setElapsedTimeList(sentence);
}

/**
 * サーバとの通信を減らすため書き込み内容を溜め込んでから書き込む
 * @param {string} message: ログ書き込み内容
 */
function setElapsedTimeList(message) {
	elapsedTimeList.push(message);

	if (elapsedTimeList.length > 19) {
		var opeMsg = "";
		for(elapsedTime of elapsedTimeList) {
			opeMsg += elapsedTime + '\r\n';
		}
		writingElapsedTime(opeMsg);
		elapsedTimeList.splice(0);
	}
}

/**
 * ログファイルに書き込みたい内容をサーバに送信
 * @param {string} opeMsg: ログ書き込み内容
 */
function writingElapsedTime(opeMsg){
  var elapsedTimeUrl = PHP_EN_ROOT_FOLDER + '/measuringElapsedTime.php';
  var formData = new FormData();

  var tableNo = (regFlg == '1' ? "reg":table_no);
  formData.append('table_no', tableNo);
  formData.append('andoroidID', androidID);
  formData.append('opeMsg', opeMsg);

  postMessage(formData, elapsedTimeUrl)
}
