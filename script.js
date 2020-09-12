// A 
// 1
let arr = [1,2, 3, 5, 6, 7,12,234]

function dividebytwo(arr, f) {
    let newArray = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 == 0) {
            newArray.push(arr[i])
        }
    }
    console.log('A 1 =' + newArray)
    console.log('last '+ newArray[newArray.length - 1])
}
dividebytwo(arr, 'chiu')
// 2
function A2() {
    let a1 = [1, 2, "a"]
    let a2 = [1, 3, "b"]
    let array1, array2;
    let newArray = [];
    if (a1.length >= a2.length) {
        array1 = a1
        array2 = a2
    } else {
        array2 = a1
        array1 = a2
    }
    for (let i = 0; i < array1.length; i++) {
        if (array2.indexOf(array1[i]) == -1) {
            newArray.push(array1[i])
        }
    }
    for (let i = 0; i < array2.length; i++) {
        if (array1.indexOf(array2[i]) == -1) {
            newArray.push(array2[i])
        }
    }
    console.log(newArray)
}
A2()
// B 
let list = document.getElementById('list')
firebase.firestore().collection("books")
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            let html = ''
            for (doc of snapshot.docs) {
                let data = doc.data()
                html += `<div class="readed-${data.readed}"><p>${data.bookName}</p><p>${data.authorName}</p></div>`
            }
            list.innerHTML = html

        });
    });
let archive = document.getElementById('archive')
firebase.firestore().collection("archive")
    .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
            let html = ''
            for (doc of snapshot.docs) {
                let data = doc.data()
                html += `<div class="row"><p>Ten sach:${data.bookName}</p><p>Ten tac gia:${data.authorName}</p></div>`
            }
            archive.innerHTML = html

        });
    });
window.addEventListener('DOMContentLoaded', (event) => {

    let form = document.getElementById('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let name = form.name.value
        let author = form.author.value
        let checkReaded = checkBoolean(form.readed.value)
        let validate = [
            validation(name != "", "book-error", "Input book"),
            validation(author != "", "author-error", "Input author"),
            validation(checkReaded != "", "readed-error", "Chọn câu trả lời"),
        ]
        if (!isPass(validate)) {
            firebase.firestore().collection("books").add({
                bookName: name,
                authorName: author,
                readed: checkReaded
            })
        }
        if (checkReaded == true) {
            firebase.firestore().collection("archive").add({
                bookName: name,
                authorName: author,
                readed: checkReaded
            })
        }
    })

    function checkBoolean(dataIn) {
        if (dataIn == 'true') {
            return true
        } else if (dataIn == 'false') {
            return false
        } else{
            return ""
        }
    }

    function validation(condition, errorTag, message) {
        if (!condition) {
            setText(errorTag, message)
            return false
        } else {
            setText(errorTag, '')
            return true
        }
    }

    function setText(id, content) {
        document.getElementById(id).innerHTML = content
    }

    function isPass(validate) {
        return validate.includes(false)
    }
});