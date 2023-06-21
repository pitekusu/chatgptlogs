$(document).ready(function() {
    $.ajax({
        url: "https://v2st81ure8.execute-api.ap-northeast-1.amazonaws.com/default/chatgptlog",
        type: "GET",
        dataType: "json",
        success: function(data) {
            // JSONデータの配列を取得
            var items = data.Items;

            // DataTableにデータをバインド
            $('#myTable').DataTable({
                data: items,
                columns: [
                    { title: "日付", data: "datetime", width: "250px"},
                    { title: "ユーザ名", data: "username", width: "250px"},
                    { title: "質問内容", data: "usermessage"},
                    { title: "ブッキーの答え", data: "fubukimessage" }
                ],
                responsive: true, // レスポンシブオプションを有効にする
                order: [[0, "desc"]] // datetime列を昇順にソートする
            });

        },
        error: function(error) {
            console.log("Error:", error);
        }
    });
});
