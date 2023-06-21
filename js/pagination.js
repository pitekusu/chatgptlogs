// ISO 8601形式の日時を人間が読みやすい形式に変換する関数
function formatDateTime(isoDateTime) {
    var date = new Date(isoDateTime);
    var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'};
    return date.toLocaleString('ja-JP', options);
}


$(document).ready(function() {
    $.ajax({
        url: "https://v2st81ure8.execute-api.ap-northeast-1.amazonaws.com/default/chatgptlog",
        type: "GET",
        dataType: "json",
        success: function(data) {
            // JSONデータの配列を取得
            var items = data.Items;

    	// 日時を人間が読みやすい形式に変換する
    	items.forEach(function(item) {
       	 item.datetime = formatDateTime(item.datetime);
    	});

            // DataTableにデータをバインド
            $('#myTable').DataTable({
                language: {
                url: '//cdn.datatables.net/plug-ins/1.13.4/i18n/ja.json',
                },
                data: items,
                fixedHeader: true,
                columns: [
                    { title: "日付", data: "datetime", width: "20%"},
                    { title: "ユーザ名", data: "username", width: "10%"},
                    { title: "質問内容", data: "usermessage", width: "20%"},
                    { title: "ブッキーの答え", data: "fubukimessage", width: "50%" }
                ],
                deferRender: true, // deferRender オプションを追加
                responsive: true, // レスポンシブオプションを有効にする
                order: [[0, "desc"]] // datetime列を昇順にソートする
            });

        },
        error: function(error) {
            console.log("Error:", error);
        }
    });
});
