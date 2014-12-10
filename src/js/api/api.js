this.mmooc=this.mmooc||{};


this.mmooc.api = function() {
	return {
		getCourses: function(callback, error) {
			var data = {};
			callback(data);
		},

		getModulesForCurrentCourse: function(callback, error) {
			var data = {};
			callback(data);
		}
	};
}();
