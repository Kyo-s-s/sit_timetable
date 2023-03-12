const subjectList = Array.from(document.querySelectorAll("#Subject"));
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
        "name" : table[2].innerText,
        "week": week,
        "period": period,
        "teacher": table[1].innerText,
        "credit": credit,
        "division": division,
        "time": time
    }
})

const blob = new Blob(
    [JSON.stringify({
        "lectures": lectures
    })],
    {type: "application/json"}
);

const url = window.URL.createObjectURL(blob);

const a = document.createElement("a");
document.body.appendChild(a);
a.style = "display: none";
a.href = url;
// a.download = "test.json";
a.download = document.querySelector("#CP").innerText.slice(0, -3) + ".json";
document.body.appendChild(a);
a.click();
window.URL.revokeObjectURL(url);
