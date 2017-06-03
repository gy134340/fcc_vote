var app = new Vue({
	el: '#app',
	data: {
		obj: {
			name: '',
			owner: '',
			option: [],
			active: true
		}
	},
	computed: {

	},
	created: function() {
		this.process();
		// console.log('test');
	},
	mounted: function() {
		// this.enableChart(this.obj)
		// .then(function() {

		// });
		// this.insertData();
	},
	methods: {
		process: function() {
			var that = this;
			this.getData()
				.then(function() {
					that.enableChart(that.obj);
				});
		},
		getData: function() {
			// var id = '59325e05d30909cd9c9cacf1';
			var id = '5932636cd30909cd9c9cacf4';
			var url = '/' + id;
			var that = this;
			return new Promise(function(resolve, reject) {
				axios.get(url).then(function(dt) {	
					that.obj = dt.data;
					// console.log('show', that.obj);
					resolve()
				}).catch(function(err) {
					// console.log('create err:' + err);
					reject()
				});
			});
		},
		enableChart: function(obj) {
			var label = [];
			var data = [];
			var bgColor = [];
			var bdColor = [];
			obj.option.map(function(value){
				label.push(value.name + ':' + value.votes);
				data.push(value.votes);
				var r = parseInt(Math.random() * 255);
				var g = parseInt(Math.random() * 255);
				var b = parseInt(Math.random() * 255);
				bgColor.push('rgba(' + r + ',' + g + ','+ b +','+ 0.2+')');
				bdColor.push('rgba(' + r + ',' + g + ','+ b +','+ 1+')');
			});
			var ctx = document.getElementById('myChart');
			var myChart = new Chart(ctx, {
				type: 'pie',
				data: {
					labels: label,
					datasets: [{
						label: 'pie',
						data: data,
						backgroundColor: bgColor,
						borderColor: bdColor,
						borderWidth: 1
					}]
				},
				options: {
					cutoutPercentage: 10,
					events: ['click']
				}
			});
		},
		updateVote: function() {
			var select = document.getElementById('select');
			var value = select.options[select.selectedIndex].value;
			var that = this;

			// put 全改，patch 改部分的
			if (value) {
				var obj = {
					id: '59325e05d30909cd9c9cacf1',
					sub_id: value
				};
				var url = '/' + '5932636cd30909cd9c9cacf4';
				axios.patch(url, obj).then(function(dt) {	
					if (dt.data !== 'ipExists') {
						that.obj = dt.data;
						that.enableChart(that.obj);
					} else {
						alert('您已经投过一次了！');
					}
					
					console.log('update', dt);
				}).catch(function(err) {
					console.log('update err:' + err);
				});
			} else {
				alert('请先选择一个种类！');
			}
		},
		createVote: function() {
			var obj = {
				name: 'boy or girl',
				owner: 'gy',
				option: [{
					name: 'boy',
					votes: 0
				},
				{
					name: 'girl',
					votes: 0
				}],
				voters:[111, 222 ],	// 每人只能选一次，ip judge
				active: true,
			}
			axios.post('/', obj).then(function(dt) {
				console.log('create', dt);
			}).catch(function(err) {
				console.log('create err:' + err);
			});
		}
	}
});