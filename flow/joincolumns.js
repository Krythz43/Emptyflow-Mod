exports.id = 'joincols';
exports.title = 'Join Columns';
exports.version = '1.2.1';
exports.group = 'DATAX Test 1';
exports.author = 'Krithick';
exports.color = '#D770AD';
exports.icon = 'code';
exports.input = true;
exports.output = 1;
exports.options = {};
exports.readme = `# Simply add all coloumns you want to join
`;

exports.html = `
<div class="padding">
	<div data-jc="textbox" data-jc-path="csv1" class="m mt10">Link of first CSV to join</div>
	<div data-jc="textbox" data-jc-path="column1" class="m mt10">Name of column in first CSV</div>

	<div data-jc="dropdown" data-jc-path="where" data-jc-config="required:true;items:==,<,>,contains" class="m">where condition</div>

	<div data-jc="textbox" data-jc-path="csv2" class="m mt10">Link of second CSV to join</div>
	<div data-jc="textbox" data-jc-path="column2" class="m mt10">Name of column in second CSV</div>
</div>`;

exports.install = function(instance) {

	instance.on('data', function(flowdata, next) {
		var options = instance.options;
	});
};
