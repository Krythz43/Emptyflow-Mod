exports.id = 'fullnamecal';
exports.title = 'Obtain Full Name';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'code';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Formulates Full Name from given options
	Double click to find out more

`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="first Name" class="m mt10">Column name containing first Name</div>
	<div data-jc="textbox" data-jc-path="last Name" class="m mt10">Column name containing last Name</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {
		var options = instance.options;
	});
};
