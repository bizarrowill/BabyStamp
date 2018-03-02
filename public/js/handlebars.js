// helpers here for handlebars
// https://stackoverflow.com/questions/32707322/how-to-make-a-handlebars-helper-global-in-expressjs/42224612#42224612
function hbsHelpers(exphbs) {
    return exphbs.create({
        helpers : {
            if : function(conditional, options) {
                if (options.hash.desired === options.hash.type) {
                    options.fn(this);
                } else {
                    options.inverse(this);
                }
            }
        }
    });
}
//   example https://gist.github.com/pheuter/3515945

module.exports = hbsHelpers;