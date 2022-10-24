function printLCSubStr() {
  let X = document.getElementById("text1").value;
  let Y = document.getElementById("text2").value;
  let m = X.length;
  let n = Y.length;
  let LCSuff = new Array(m + 1);
  let len = 0;
  let LCSList = [];
  let result = [];

  for (let i = 0; i <= m; i++) {
    LCSuff[i] = Array(n + 1);
    for (let j = 0; j <= n; j++) {
      LCSuff[i][j] = 0;
      if (i == 0 || j == 0) LCSuff[i][j] = 0;
      else if (X[i - 1] == Y[j - 1]) {
        LCSuff[i][j] = LCSuff[i - 1][j - 1] + 1;
        if (len < LCSuff[i][j]) {
          len = LCSuff[i][j];
          LCSList = [];
          LCSList.push([i, j]);
        } else if (len === LCSuff[i][j]) {
          LCSList.push([i, j]);
        }
      } else LCSuff[i][j] = 0;
    }
  }

  if (len == 0) {
    alert("Không có chuỗi con chung!");
  }

  for (position in LCSList) {
    let [newRow, newCol] = LCSList[position];
    let newLen = len;
    let resultStr = "";

    while (LCSuff[newRow][newCol] != 0) {
      resultStr = X[newRow - 1] + resultStr; // or Y[col-1]
      --newLen;

      newRow--;
      newCol--;
    }

    if (result.indexOf(resultStr) === -1) {
      result.push(resultStr);
    }
  }
  document.getElementById("subsequences").innerHTML = "";
  let count = 0;
  result.map((res) => {
    X = X.replace(res, `<##${count}>${res}</#${count}>`);
    Y = Y.replace(res, `<##${count}>${res}</#${count}>`);
    count++;
    document.getElementById(
      "subsequences"
    ).innerHTML += `<p>${res} <span style="color:red"> - ${res.length} chars</span></p>`;
  });
  let string1 = `<p>${X}</p>`;
  let string2 = `<p>${Y}</p>`;
  for (let i = 0; i <= count; i++) {
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    string1 = string1
      .replace(`##${i}`, `span class="result" style="color:#${randomColor};"`)
      .replace(`/#${i}`, "/span");
    console.log(`##${i}`);
    string2 = string2
      .replace(`##${i}`, `span class="result" style="color:#${randomColor};"`)
      .replace(`/#${i}`, "/span");
  }
  console.log({ string1, string2 });
  document.getElementById("result1").innerHTML = string1;
  document.getElementById("result2").innerHTML = string2;
}
document.getElementById("button").addEventListener("click", printLCSubStr);
