/**
 * Pavage <https://github.com/flozz/pavage>
 * @copyright Copyright 2016 Fabien LOISON <http://www.flozz.fr/>
 * @license MIT
 */

(function (root, factory) {
    ; /* jshint ignore:line */ /* jshint ignore:start */
    if (typeof define === "function" && define.amd) {
        define([], factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory();
    } else {
        root.pavage = factory();
    }
    /* jshint ignore:end */
}(this, function () {
    "use strict";

    function _getSmallerColumn(columns) {
        var column = {offsetHeight: Infinity};

        for (var i = 0 ; i < columns.length ; i++) {
            if (!(columns[i] instanceof HTMLElement)) continue;
            if (columns[i].offsetHeight < column.offsetHeight) {
                column = columns[i];
            }
        }

        return column;
    }

    function _getOptions(node) {
        return {
            colCount: Number(node.getAttribute("data-column")) || 3,
            spacing: Number(node.getAttribute("data-spacing")) || 0
        };
    }

    function _stylizeParentNode(node) {
        node.style.display = "flex";
    }

    function _makeColumn(options, first) {
        var div = document.createElement("div");
        div.className = "waterfall-column";
        div.style.flexGrow = 1;
        div.style.alignSelf = "flex-start";
        if (!first) {
            div.style.marginLeft = options.spacing + "px";
        }
        return div;
    }

    function _insertItem(columns, item, options) {
        var column = _getSmallerColumn(columns);
        item.style.marginBottom = options.spacing + "px";
        column.appendChild(item);
    }

    function generate(node) {
        var items = Array.prototype.slice.call(node.childNodes, 0);
        var options = _getOptions(node);

        node.innerHTML = "";  // FIXME
        _stylizeParentNode(node);

        var i;
        var column;

        var columns = [];
        for (i = 0 ; i < options.colCount ; i++) {
            column = _makeColumn(options, i === 0);
            columns.push(column);
            node.appendChild(column);
        }

        for (i = 0 ; i < items.length ; i++) {
            if (!(items[i] instanceof HTMLElement)) continue;
            _insertItem(columns, items[i], options);
        }
    }

    function insertItem(node, item) {
        var options = _getOptions(node);
        _insertItem(node.childNodes, item, options);
    }

    function fromDOM() {
        var nodes = document.getElementsByClassName("pavage");
        for (var i = 0 ; i < nodes.length ; i++) {
            generate(nodes[i]);
        }
    }

    return {
        fromDOM: fromDOM,
        generate: generate,
        insertItem: insertItem
    };

}));
