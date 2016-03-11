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
            if (columns[i].offsetHeight < column.offsetHeight) {
                column = columns[i];
            }
        }

        return column;
    }

    function _stylizeParentNode(node) {
        node.style.display = "flex";
    }

    function _makeColumn(spacing, first) {
        var div = document.createElement("div");
        div.className = "waterfall-column";
        div.style.flexGrow = 1;
        div.style.alignSelf = "flex-start";
        if (!first) {
            div.style.marginLeft = spacing + "px";
        }
        return div;
    }

    function generate(node) {
        var items = Array.prototype.slice.call(node.childNodes, 0);
        var colCount = Number(node.getAttribute("data-column")) || 3;
        var spacing = Number(node.getAttribute("data-spacing")) || 0;

        node.innerHTML = "";  // FIXME
        _stylizeParentNode(node);

        var i;
        var column;

        var columns = [];
        for (i = 0 ; i < colCount ; i++) {
            column = _makeColumn(spacing, i === 0);
            columns.push(column);
            node.appendChild(column);
        }

        for (i = 0 ; i < items.length ; i++) {
            if (!(items[i] instanceof HTMLElement)) continue;
            column = _getSmallerColumn(columns);
            items[i].style.marginBottom = spacing + "px";
            column.appendChild(items[i]);
        }
    }

    function fromDOM() {
        var nodes = document.getElementsByClassName("pavage");
        for (var i = 0 ; i < nodes.length ; i++) {
            generate(nodes[i]);
        }
    }

    return {
        fromDOM: fromDOM,
        generate: generate
    };

}));
