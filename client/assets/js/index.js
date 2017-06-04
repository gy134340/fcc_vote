var app = new Vue({
	el: '#app',
	data: {
		obj: {
			name: '',
			owner: '',
			option: [],
			active: true
		},
		user: {},
		votes: [],
		userVotes: [],
		isCreate: false,
		isUserVote: false,
		tmp_id: '59325e05d30909cd9c9cacf1'
	},
	computed: {

	},
	created: function() {
		var id = this.tmp_id;
		this.process(id);
		this.getAll();
		// console.log('test');
	},
	mounted: function() {
		var that = this;
		this.getAuth().then(function(dt) {
			that.user = dt;
			console.log(that.user);
		});
	},
	methods: {
		startCreate: function() {
			this.isCreate = true;
		},
		endCreate: function() {
			this.isCreate = false;
		},
		getAuth: function() {
			return new Promise(function(resolve, reject) {
				axios.post('/login').then(function(dt) {
					console.log('isauth', dt.data);
					resolve(dt.data);
				});
			});
		},
		loginOut: function() {
			var that = this;
			// return new Promise(function(resolve, reject) {
				axios.post('/loginout').then(function(dt) {
					// console.log('isauth', dt.data);
					that.user = dt.data;
					alert('已登出');
				});
			// });
		},
		getAll: function() {
			var that = this;
			axios.get('/votelist').then(function(dt) {
				that.votes = dt.data;
				console.log('votes', that.votes);
			});
		},
		getUserAll: function() {
			var that = this;
			this.isUserVote = true;
			var url = '/votelist?username=' + this.user.username;
			axios.get(url).then(function(dt) {
				that.userVotes = dt.data;
				console.log('uservotes', dt.data);
			});
		},
		closeUserVote: function() {
			this.isUserVote = false;
		},
 		process: function(id) {
			var that = this;
			this.tmp_id = id;
			that.closeUserVote();
			if (id) {
				this.getData(id)
					.then(function() {
						that.enableChart(that.obj);
					});
			}	
		},
		getData: function(id) {
			// var id = '5932636cd30909cd9c9cacf4';
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
				bgColor.push('rgba(' + 128 + ',' + g + ','+ b +','+ 0.2+')');
				bdColor.push('rgba(' + 128 + ',' + g + ','+ b +','+ 1+')');
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
		updateVote: function(id) {
			var select = document.getElementById('select');
			var value = select.options[select.selectedIndex].value;
			var that = this;

			// put 全改，patch 改部分的
			if (value) {
				var obj = {
					id: id,
					sub_id: value
				};
				var url = '/' + id;
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
			var title = document.getElementById('create_name').value;
			var options = document.getElementById('create_option').value;
			document.getElementById('create_name').value = '';
			document.getElementById('create_option').value = '';
			// console.log(title.value);
			if (title.length = 0) {
				alert('请输入投票的标题');
				return;
			}

			if (options.length = 0) {
				alert('请输入投票的选项');
				return;
			}
			options = options.split('\n');

			var option_obj = [];
			options.map(function(value) {
				option_obj.push({
					name: value,
					votes: 0
				});
			});
			var that = this;
			if (this.user.username) {
				var obj = {
					name: title,
					owner: this.user.username,
					option: option_obj,
					voters:[],
					active: true,
				}
				axios.post('/', obj).then(function(dt) {
					console.log('create', dt);
					that.endCreate();
					that.getAll();
				}).catch(function(err) {
					console.log('create err:' + err);
				});
			}
			
		},
		deleteVote: function(id) {
			var url = '/' + id;
			var that = this;
			axios.delete(url).then(function(dt) {	
				that.closeUserVote();
				that.getAll();
				console.log('delete', dt.data);		
			}).catch(function(err) {
				// console.log('create err:' + err);	
			});
		},
		login: function(){
			var url = 'https://github.com/login/oauth/authorize?client_id=4e76781521758dd671ec&state=login&redirect_uri=http://127.0.0.1:8080/auth/github';
			window.location.href = url;
			// var data = new FormData();
			// data.append('client_id', '4e76781521758dd671ec');
			// data.append('state', 'login');
			// data.append('redirect_uri', 'http://127.0.0.1:8080/auth/github');
			// axios.get('https://github.com/login/oauth/authorize', data).then(function(dt) {
			// 	console.log('test', dt.data);
			// });
		}
	}
});







