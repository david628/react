// var data = [{
//   name: 'a',
//   value: 100,
//   children: [{
//     name: 'a1',
//     value: 10
//   }, {
//     name: 'a2',
//     value: 30
//   }, {
//     name: 'a3',
//     value: 60
//   }]
// }, {
//   name: 'b',
//   value: 100,
//   children: [{
//     name: 'b1',
//     value: 10
//   }, {
//     name: 'b2',
//     value: 30
//   }, {
//     name: 'b3',
//     value: 60
//   }]
// }, {
//   name: 'c',
//   value: 100,
//   children: [{
//     name: 'c1',
//     value: 10
//   }, {
//     name: 'c2',
//     value: 30
//   }, {
//     name: 'c3',
//     value: 60
//   }]
// }, {
//   name: 'd',
//   value: 100,
//   children: [{
//     name: 'd1',
//     value: 10
//   }, {
//     name: 'd2',
//     value: 30
//   }, {
//     name: 'd3',
//     value: 60
//   }]
// }];
var _data = [{
  name: 'Webkit内核',
  value: 60,
  children: [{
    name: 'Safari',
    value: 10
  }, {
    name: 'Chrome',
    value: 60
  }]
}, {
  name: 'Gecko内核',
  value: 30,
  children: [{
    name: 'netscape',
    value: 10
  }, {
    name: 'Mozilla',
    value: 20,
    children: [{
      name: 'test',
      value: 10
    }]
  }]
}, {
  name: 'Trident内核',
  value: 10,
  children: [{
    name: 'IE',
    value: 10
  }]
}];
var data = [];
function issueData(data, rs) {
  this.relative = {
    name: 'name',
    value: 'value',
    children: 'children'
  };
  let item;
  for(let i = 0; i < data.length; i++) {
    item = {
      name: data[i][this.relative['name']],
      value: data[i][this.relative['value']]
    }
    if(data[i][this.relative['children']] && data[i][this.relative['children']].length) {
      item.children = [];
      issueData(data[i][this.relative['children']], item.children);
    }
    rs.push(item);
  }
}
issueData(_data, data);
console.log(data);
var ec = echarts.init(document.getElementById('id-test'));
ec.setOption({
  tooltip: {
    formatter: function(info) {
      var asset_num = info.value;
      var name = info.name;
      return [
        '<div>' + name + '</div>',
        '<div>资产数量：' + asset_num + '</div>',
      ].join('\n');
    }
  },
  // legend: {
  //   data: ['客户特征', '客户特征2'],
  //   selectedMode: 'single',
  //   top: 55,
  //   itemGap: 5,
  //   backgroundColor: 'rgb(243,243,243)',
  //   borderRadius: 5
  // },
  series: [{
    name: '客户特征',
    type: 'treemap',
    //visibleMin: 300,
    data: data,
    leafDepth: 2,
    label: {
      show: true,
      formatter: "{b}",
      normal: {
        textStyle: {
          ellipsis: true
        }
      }
    },
    breadcrumb: {
      show: true,
      //height: 40,
      left: 'center',
      top: 50,
      itemStyle: {
        color: 'rgba(0,0,0,0.7)',
        borderColor: 'rgba(0,0,0,0.5)',
        borderWidth: 1,
        shadowBlur: 0,
        textStyle: {
          color: '#fff',
          fontWeight: 'normal',
          fontFamily: 'sans-serif',
          fontSize: 12
        }
      }
    },
    itemStyle: {
      normal: {
        borderWidth: 0.5,
        borderColor: '#000'
      }
    },
    //color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
    //color: ['red', 'gold', 'green'],
    //colorMappingBy: 'value',
    levels: [{
      //colorAlpha: [0.3, 1],
      //colorSaturation: [0.3, 0.5],
      //colorMappingBy: 'value',
      //color: ['red', 'gold', 'green'],
      color: ['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83',  '#ca8622', '#bda29a','#6e7074', '#546570', '#c4ccd3'],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.0,
          gapWidth: 0,
          borderWidth: 0
        }
      }
    }]
    /*,
    levels: [{
      colorSaturation: [0.3, 0.5],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.0,
          gapWidth: 0,
          borderWidth: 0
        }
      }
    }, {
      colorSaturation: [0.3, 0.5],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.0,
          gapWidth: 0,
          borderWidth: 0
        }
      }
    }, {
      colorSaturation: [0.3, 0.5],
      itemStyle: {
        normal: {
          borderColorSaturation: 0.0,
          gapWidth: 0,
          borderWidth: 0
        }
      }
    }]*/
  }]
});