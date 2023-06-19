$(document).ready(function() {
    // ページ読み込み時に実行したい処理
    var apiurl = "https://v2st81ure8.execute-api.ap-northeast-1.amazonaws.com/default/chatgptlog";

    $.ajax({
            url: apiurl,
            type: 'GET',
            dataType: 'json',
        })
        // Ajaxリクエストが成功した時発動
        .done(function(response) {
            var item = response.Items;
            var table = document.getElementById('chatgptlog');
            for (let i = 0; i < item.length; i++) {
                var tr = $('<tr></tr>').appendTo(table);
                $('<td>' + item[i].datetime + '</td>').appendTo(tr);
                $('<td>' + item[i].username + '</td>').appendTo(tr);
                $('<td>' + item[i].usermessage + '</td>').appendTo(tr);
                $('<td>' + item[i].fubukimessage + '</td>').appendTo(tr);
            }

        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            alert('エラーです')
        })
});

// ページング機能
const pagination = () => {
    // 初期値設定
    let page = 1; // 現在のページ（何ページ目か）
    const step = 5; // ステップ数（1ページに表示する項目数）

    // 現在のページ/全ページ を表示
    const count = (page, step) => {
        const p = $('.count').text();
        const total = (item.length % step == 0) ? (item.length / step) : (Math.floor(item.length / step) + 1);
        $('.count').text(page + "/" + total + "ページ");
    }

    // ページを表示
    const show = (page, step) => {
        // 一度テーブルを空にする
        $('.item_list tbody').empty();
        const first = (page - 1) * step + 1;
        const last = page * step;
        item.forEach((item, i) => {
            if(i < first - 1 || i > last - 1) return;
            $('.item_list tbody').append($(`<tr data-id=${item.id}>`)
                .append(
                    `<td>${item.name}</td>`,
                    `<td>${item.price}</td>`
                )
            );
        });
        count(page,step);
    }

    // 最初に1ページ目を表示
    show(page, step);

    // 最前ページ遷移トリガー
    $(document).on('click','#first',function(){
        if(page <= 1) return;
        page = 1;
        show(page, step);
    });

    // 前ページ遷移トリガー
    $(document).on('click','#prev',function(){
        if(page <= 1) return;
        page = page - 1;
        show(page, step);
    });

    // 次ページ遷移トリガー
    $(document).on('click','#next',function(){
        if(page >= item.length / step) return;
        page = page + 1;
        show(page, step);
    });

    // 最終ページ遷移トリガー
    $(document).on('click','#last',function(){
        if(page >= item.length / step) return;
        page = Math.ceil(item.length / step);
        show(page, step);
    });
}

$(window).on('load',function(){
    pagination();
});