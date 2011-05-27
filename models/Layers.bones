// LayerList
// ---------
// Collection. List of Layer models. This collection is a child of the
// Project model and updates its parent on update events.
// **This collection is not backed directly by the server.**
model = Backbone.Collection.extend({
    model: models.Layer,
    initialize: function(models, options) {
        var self = this;
        this.parent = options.parent;
        this.bind('change', function() {
            this.parent.set({ 'Layer': self });
            this.parent.change();
        });
        this.bind('add', function() {
            this.parent.set({ 'Layer': self });
            this.parent.change();
        });
        this.bind('remove', function() {
            this.parent.set({ 'Layer': self });
            this.parent.change();
        });
    }
});
