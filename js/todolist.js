$(function() {
    //渲染页面
    load()
    $("#title").on("keydown", function(event) {
            if (event.keyCode === 13) {
                if ($(this).val() === "") {
                    alert("请输入内容")
                } else {
                    var local = getDate()
                        // 把最新的数据追加个local数组
                    local.push({ title: $(this).val(), done: false })
                    saveDate(local)
                    load()
                    $(this).val("")
                }
            }
        })
        // 删除操作
    $("ol,ul").on("click", "a", function() {
        var data = getDate()
        var index = $(this).attr("id")
            // splice：删除数组的元素
        data.splice(index, 1)
        saveDate(data)
        load()
    })
    $("ol,ul").on("click", "input", function() {
            var data = getDate()
            var index = $(this).siblings("a").attr("id")
                // 固有属性使用prop，自定义属性使用attr
            data[index].done = $(this).prop("checked")
            saveDate(data)
            load()
        })
        // 读取本地存储的数据
    function getDate() {
        var data = localStorage.getItem("todolist")

        if (data !== null) {
            // 本地存储里面的数据是字符串格式的，需要使用JSON.parse转成对象格式
            return JSON.parse(data)
        } else {
            return []
        }
    }
    // 保存本地存储数据
    function saveDate(data) {
        localStorage.setItem("todolist", JSON.stringify(data))
    }
    // 渲染加载数据
    function load() {
        var data = getDate()
            // 遍历之前先要清空ol里面的元素
        $("ol,ul").empty()
        var todoCount = 0
        var doneCount = 0
            //通过.each遍历这个数据 
        $.each(data, function(i, n) {
            if (n.done) {
                $("ul").prepend("<li><input type='checkbox' checked='checked'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
                doneCount++
            } else {
                $("ol").prepend("<li><input type='checkbox'><p>" + n.title + "</p><a href='javascript:;' id=" + i + "></a></li>")
                todoCount++
            }

        })
        $("#todocount").text(todoCount)
        $("#donecount").text(doneCount)
    }
})