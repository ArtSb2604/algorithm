function sumDigits(num) {
    return num.toString().match(/-?\d/g).reduce(function(a, b) {
        return +a + +b;
    });
}


function countDigits(number) {
    var digitCount = Array(10).fill(0);
    var digits = number.toString();
  
    for (var i = 0; i < digits.length; i++) {
      var digit = parseInt(digits[i], 10);
  
      if (!isNaN(digit)) {
        digitCount[digit]++;
      }
    }
  
    return digitCount;
  }

  $('.btn-primary').click(function() {
    if ($(window).width() < 800) {
        $('.mob').css('display', 'block')
    } else {
        $('.desc').css('display', 'block')
    }
    $('.table_list').empty()
    $('.table_list').append(`<table class="table" id="table">
    <thead>
      <tr>
        <th scope="col">Год</th>
        <th scope="col">Возраст</th>
        <th scope="col">Тип</th>
      </tr>
    </thead>
    <tbody class="tbody_1">
    </tbody>
  </table>
  <table class="table" id="table_1">
    <thead>
      <tr>
        <th scope="col">Год</th>
        <th scope="col">Возраст</th>
        <th scope="col">Тип</th>
      </tr>
    </thead>
    <tbody class="tbody_2">
    </tbody>
  </table>
  <table class="table" id='table_2'>
    <thead>
      <tr>
        <th scope="col">Год</th>
        <th scope="col">Возраст</th>
        <th scope="col">Тип</th>
      </tr>
    </thead>
    <tbody class="tbody_3">
    </tbody>
  </table>`)
    var date = $('#date').val().split('-');
    var day = parseInt(date[2], 10);
    var mounth = parseInt(date[1], 10);
    var year = Number(date[0])
    var new_year = Number(date[0])
    var data_1 = []
    var data_2 = []

    for (let i = 1; i <= 101; i++) {
        var one = Number(sumDigits(year)) + Number(sumDigits(mounth)) + Number(sumDigits(day));
        var two = Number(sumDigits(one));
        var three = Math.abs(one - (2 * Number(day.toString()[0])));
        var four = Number(sumDigits(three));
        var count_all = countDigits(day.toString() + mounth.toString() + year.toString() + one.toString() + two.toString() + three.toString() + four.toString())
        var matrix = [
            [count_all[1], count_all[4], count_all[7]],
            [count_all[2], count_all[5], count_all[8]],
            [count_all[3], count_all[6], count_all[9]]
        ]
        

        var d = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0]
        var triangle = Math.abs((matrix[0][0] * matrix[1][1] * matrix[2][2] + matrix[1][0] * matrix[2][1] * matrix[0][2] + matrix[0][1] * matrix[2][0] * matrix[1][2]) - (matrix[0][2] * matrix[1][1] * matrix[2][0] + matrix[0][1] * matrix[1][0] * matrix[2][2] + matrix[0][0] * matrix[2][1] * matrix[1][2]))
        var type = 0
        if (d > 0 && triangle == 0) {
            type += 6
        }
        if (d < 0 && triangle == 0) {
            type += 5
        }
        if (d == 0 && triangle != 0) {
            type += 4
        }
        if (d > 0 && triangle != 0) {
            type += 3
        }
        if (d < 0 && triangle != 0) {
            type += 2
        }
        if (d == 0 && triangle == 0) {
            type += 1
        }
        if (year < new_year+34) {
            $('.tbody_1').append(`<tr><td>${year}</td><td>${year-new_year}</td><td>${type}</td></tr>`)
            if (i <= 50) { data_1.push(type) } 
            if (i > 50) { data_2.push(type) }
        }
        if (year > new_year+33 && year < new_year+67) {
            $('.tbody_2').append(`<tr><td>${year}</td><td>${year-new_year}</td><td>${type}</td></tr>`)
            if (i <= 50) { data_1.push(type) } 
            if (i > 50) { data_2.push(type) }
        }
        console.log(data_1)
        if (year > new_year+66) {
            $('.tbody_3').append(`<tr><td>${year}</td><td>${year-new_year}</td><td>${type}</td></tr>`)
            if (i <= 50) { data_1.push(type) } 
            if (i > 50) { data_2.push(type) }
        }
        console.log(i, data_1)
        year += 1;
    }
    var labels_1 = []
    var labels_2 = []
    for (let i = 0; i < 50; i++) {
        labels_1.push(i)
    }

    for (let i = 50; i <= 100; i++) {
        labels_2.push(i)
    }
    $('.graphs').empty();
    $('.graphs').append('<canvas id="myChart"></canvas><canvas id="myChart1"></canvas>');


    new Chart("myChart", {
        type: "line",
        data: {
            labels: labels_1,
            datasets: [{
                fill: false,
                pointRadius: 5,
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: "rgba(255,0,0,0.5)",
                data: data_1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                  display: false // установите значение false, чтобы скрыть легенду
                }
              },
            animation: {
                duration: 0
            },        
            title: {
                display: true,
                fontSize: 16
            },
            elements: {
                line: {
                    tension: 0.1
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                        stepSize: 1,
                        callback: function(value, index, values) {
                          return value; // Добавляем знак % к значениям меток
                        }
                    },
                    min: 0,
                },
            },
        }
    });
    
    new Chart("myChart1", {
        type: "line",
        data: {
            labels: labels_2,
            datasets: [{
                fill: false,
                pointRadius: 5,
                backgroundColor: 'rgba(255, 0, 0, 0.2)',
                borderColor: "rgba(255,0,0,0.5)",
                data: data_2,
                
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                  display: false // установите значение false, чтобы скрыть легенду
                }
              },
            animation: {
                duration: 0
            },        
            title: {
                display: true,
                fontSize: 16
            },
            elements: {
                line: {
                    tension: 0.1
                }
            },
            scales: {
                y: {
                    ticks: {
                        beginAtZero: true,
                        userCallback: function(label, index, labels) {
                            // when the floored value is the same as the value we have a whole number
                            if (Math.floor(label) === label) {
                                return label;
                            }
       
                        },
                        stepSize: 1,
                        callback: function(value, index, values) {
                          return value; // Добавляем знак % к значениям меток
                        }
                    },
                    min: 0,
                }
            },
        }
    });
    
    function countDigits_1(array) {
        let digitCount = {};
      
        for (let i = 0; i < array.length; i++) {
          const digit = array[i].toString();
      
          if (digitCount[digit]) {
            digitCount[digit]++;
          } else {
            digitCount[digit] = 1;
          }
        }
      
        return digitCount;
      }
      
    var max = countDigits_1(data_1.concat(data_2))
    const entries = Object.entries(max);
    const maxValue = Math.max(...Object.values(max));
    const maxEntry = entries.find(entry => entry[1] === maxValue);
    const maxKey = maxEntry[0];
    switch(data_1[0]) {
        case 1:
            $('.type_result').text("№1 - Наводящий порядок");
            break;
        case 2:
            $('.type_result').text("№2 - Копирующий");
            break;
        case 3:
            $('.type_result').text("№3 - Создающий свой мир");
            break;
        case 4:
            $('.type_result').text("№4 - Ищущий новое");
            break;
        case 5:
            $('.type_result').text("№5 - Революционер");
            break;
        case 6:
            $('.type_result').text("№6 - Разрушитель, бунтарь");
            break;
    }

    var day_1 = parseInt(date[2], 10);
    var mounth_1 = parseInt(date[1], 10);
    var one_1 = Number(sumDigits(new_year)) + Number(sumDigits(mounth_1)) + Number(sumDigits(day_1));
    var two_1 = Number(sumDigits(one_1));
    var three_1 = Math.abs(one_1 - (2 * Number(day.toString()[0])));
    var four_1 = Number(sumDigits(three_1));
    var count_all_1 = countDigits(day_1.toString() + mounth_1.toString() + new_year.toString() + one_1.toString() + two_1.toString() + three_1.toString() + four_1.toString())
    var matrix_1 = [
            [count_all_1[1], count_all_1[4], count_all_1[7]],
            [count_all_1[2], count_all_1[5], count_all_1[8]],
            [count_all_1[3], count_all_1[6], count_all_1[9]]
    ]

    $('.day').text(day_1)
    $('.mounth').text(mounth_1)
    $('.year').text(new_year)
    $('.one').text(one_1)
    $('.two').text(two_1)
    $('.three').text(three_1)
    $('.four').text(four_1)

    $(".stroke_1_1").text(count_all_1[1]);
    $(".stroke_1_2").text(count_all_1[4]);
    $(".stroke_1_3").text(count_all_1[7]);
    $(".stroke_2_1").text(count_all_1[2]);
    $(".stroke_2_2").text(count_all_1[5]);
    $(".stroke_2_3").text(count_all_1[8]);
    $(".stroke_3_1").text(count_all_1[3]);
    $(".stroke_3_2").text(count_all_1[6]);
    $(".stroke_3_3").text(count_all_1[9]);
    $(".stroke_3_4").text(count_all_1[0]);
});





function generatePDF() {
    html2canvas(document.getElementById('body')).then(function(canvas2) {
        // Создание PDF документа
        window.jsPDF = window.jspdf.jsPDF
        var pdfDoc = new jsPDF();

        // Добавление первого графика в PDF

        // Добавление второго графика в PDF
        var imgData2 = canvas2.toDataURL('image/jpeg', 1.0);
        pdfDoc.addImage(imgData2, 'JPEG', -20, -2, 250, 300);

        // Сохранение PDF файла
        pdfDoc.save('charts.pdf');
    });
}

function generatePDF_mob() {
    var element = document.getElementById("body");

// Создание опций для экспорта в PDF
var options = {
  filename: "file_" + Date.now() + ".pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 1 },
  jsPDF: { unit: "in", format: "letter", orientation: "portrait" }
};

html2pdf().set(options).from(element).save();
    
}