// http://timetable.sic.shibaura-it.ac.jp/

const lectureData = (element) => {
    const subjectList = Array.from(element.querySelectorAll("#Subject"));
    const classList = subjectList.filter((sub) => sub.querySelector("table") != undefined);

    const lectures = classList.map((cls) => {
        const table = Array.from(cls.querySelectorAll("table td"));
        const texts = table[3].innerHTML.split("<br>");

        let weekParent = cls.parentElement;
        while ([0, 1].some(idx => weekParent.children[idx].attributes.bgcolor.value != "#FFFFCC")) {
            weekParent = weekParent.previousElementSibling;
        }
        const week = weekParent.children[0].innerText;

        const period = Number(cls.attributes.row.value) + 1;
        const credit = Number(texts[1].slice(0, 1));

        let divisionParent = cls.parentElement;
        while (Array.from(divisionParent.children).every(item => item.attributes.bgcolor.value != "#FFFFCC")) {
            divisionParent = divisionParent.previousElementSibling;
        }

        let division;
        if (divisionParent.children[1].attributes.bgcolor.value == "#FFFFCC") {
            division = divisionParent.children[1].innerText;
        } else {
            division = divisionParent.children[0].innerText;
        }

        const time = Number(cls.attributes.colspan.value);

        return {
            "name": table[2].innerText,
            "week": week,
            "period": period,
            "teacher": table[1].innerText,
            "credit": credit,
            "division": division,
            "time": time
        }
    })
    return {
        "lec": lectures,
        "title": element.querySelector("#CP").innerText
    }
}

const download = (url, filename) => {
    fetch(url)
        .then(res => res.text())
        .then(str => {
            const doc = new DOMParser().parseFromString(str, "text/html");
            return lectureData(doc);
        })
        .then(lec => {
            const blob = new Blob(
                [JSON.stringify({ "lectures": lec.lec })],
                { type: "application/json" }
            );
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            a.href = url;
            a.download = filename + ".json";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
}

const grade = [
    "1学年 前期",
    "1学年 後期",
    "2学年 前期",
    "2学年 後期",
    "3学年 前期",
    "3学年 後期",
    "4学年 前期",
    "4学年 後期",
];

Array.from(document.querySelectorAll("#title"))
    .slice(2) // 大学院時間割を除外 + 工学部を除外
    .map(title => {
        return {
            "table": title.nextElementSibling.querySelector("table"),
            "faculty": title.innerText
        }
    })
    .forEach(block => {
        Array.from(block.table.querySelectorAll("tr")).forEach(tr => {
            const tds = Array.from(tr.querySelectorAll("td"));
            const division = tds[0].innerText;
            const as = Array.from(tds[1].querySelectorAll("a"));
            as.forEach((a, idx) => {
                const url = a.href;
                const filename = "2024年度 " + block.faculty + "" + division + " " + grade[idx];
                download(url, filename.trim());
            })
        })
    })
