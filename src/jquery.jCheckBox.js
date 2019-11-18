// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.

(function($, window, document, undefined) {

    "use strict";

    // undefined is used here as the undefined global variable in ECMAScript 3 is
    // mutable (ie. it can be changed by someone else). undefined isn"t really being
    // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
    // can no longer be modified.

    // window and document are passed through as local variables rather than global
    // as this (slightly) quickens the resolution process and can be more efficiently
    // minified (especially when both are regularly referenced in your plugin).

    // Create the defaults once
    var pluginName = "jCheckBox",
        defaults = {
            parentClass: "parent",
            onParentChecked: function() {},
            onChildChecked: function() {},
            onParentUnchecked: function() {},
            onChildUnchecked: function() {}
        };

    // The actual plugin constructor
    function jCheckBox(element, options) {
        this.element = element;

        // jQuery has an extend method which merges the contents of two or
        // more objects, storing the result in the first object. The first object
        // is generally empty as we don"t want to alter the default options for
        // future instances of the plugin
        this.settings = $.extend({}, defaults, options);
        this.settings.parentClass = this.settings.parentClass.startsWith(".") ? this.settings.parentClass : "." + this.settings.parentClass;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    // Avoid Plugin.prototype conflicts
    $.extend(jCheckBox.prototype, {
        init: function() {

            // Place initialization logic here
            // You already have access to the DOM element and
            // the options via the instance, e.g. this.element
            // and this.settings
            // you can add more functions like the one below and
            // call them like the example below
            // this.yourOtherFunction("jQuery Boilerplate");
            var _this = this;
            $(this.element).on("click", "input" + this.settings.parentClass + ":checkbox", function(event) {
                _this.parentClicked(event);
            });

            $(this.element).on('click', "input[class*='" + this.settings.parentClass.split('.')[1] + "-']:checkbox", function(event) {
                _this.childClicked(event);
            });
        },

        isAtLeastOneEnabled: function() {
            var atLeastOneEnabled = false;
            $("input[class*='" + this.settings.parentClass.split('.')[1] + "-']:checkbox").each(function(index, el) {
                el = $(el);
                if (el.is(":checked")) {
                    atLeastOneEnabled = true;
                }
            });
            return atLeastOneEnabled;
        },
        childClicked: function(event) {
            var element = $(event.target);
            var temp = element.attr("class").split(" ").pop().split("-");
            var parentId = temp[1];
            if (element.is(":checked")) {
                $(this.element).find("#" + parentId).prop("checked", true);
                this.settings.onChildChecked.call(this, event, element);
            } else {
                if (!this.isAtLeastOneEnabled()) {
                    $(this.element).find("#" + parentId).prop("checked", false);
                }
                this.settings.onChildUnchecked.call(this, event, element);
            }
        },
        parentClicked: function(event) {
            var element = $(event.target);
            var id = element.attr("id");
            if (element.is(":checked")) {
                $(this.element).children("input" + this.settings.parentClass + "-" + id).prop("checked", true);
                this.settings.onParentChecked.call(this, event, element);
            } else {
                $(this.element).children("input" + this.settings.parentClass + "-" + id).prop("checked", false);
                this.settings.onParentUnchecked.call(this, event, element);
            }
        },
        checkAll: function() {
            $(this.element).find("input:checkbox").prop("checked", true);
            return this;
        },

        unCheckAll: function() {
            $(this.element).find("input:checkbox").prop("checked", false);
            return this;
        },

        getCheckedValues: function() {
            var valueArray = [];
            $(this.element).find("input:checkbox:checked").each(function() {
                valueArray.push($(this).val());
            });
            return valueArray;
        }


    });

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function(options) {
        return this.each(function() {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" +
                    pluginName, new jCheckBox(this, options));
            }
        });
    };

})(jQuery, window, document);