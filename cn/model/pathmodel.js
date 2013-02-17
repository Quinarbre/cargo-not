/**
 * @fileoverview The super model representing any model that contains a path for
 * drawing and a fill color.
 *
 * @author joseph@cs.utexas.edu (Joe Tessler)
 */

goog.provide('cn.model.PathModel');

goog.require('goog.color');
goog.require('goog.graphics.AffineTransform');
goog.require('goog.graphics.Path');
goog.require('goog.graphics.SolidFill');
goog.require('goog.graphics.Stroke');



/**
 * @param {number} width The model's drawn width (in pixels).
 * @param {number} height The model's drawn height (in pixels).
 * @param {string} color The model's fill color.
 * @constructor
 */
cn.model.PathModel = function(width, height, color) {
  if (!goog.math.isInt(width) || !goog.math.isInt(height)) {
    throw Error('width and height must be integers');
  }
  if (!goog.color.isValidColor(color)) {
    throw Error(color + ' is not a valid color');
  }

  this.width = width;
  this.height = height;
  this.path = new goog.graphics.Path();
  // TODO(joseph): Use a static stroke for all path models.
  this.stroke = new goog.graphics.Stroke(2, 'black');
  this.fill = new goog.graphics.SolidFill(color);
};


/**
 * The underlying affine transform object for all model transforms.
 * @type {!goog.graphics.AffineTransform}
 * @private
 */
cn.model.PathModel.tx_ = new goog.graphics.AffineTransform();


/**
 * @type {number}
 * @const
 */
cn.model.PathModel.prototype.width;


/**
 * @type {number}
 * @const
 */
cn.model.PathModel.prototype.height;


/**
 * The model's path representation.
 * @type {!goog.graphics.Path}
 */
cn.model.PathModel.prototype.path;


/**
 * The model's stroke style.
 * @type {!goog.graphics.Stroke}
 */
cn.model.PathModel.prototype.stroke;


/**
 * The model's fill color.
 * @type {!goog.graphics.Fill}
 */
cn.model.PathModel.prototype.fill;


/**
 * @return {number} The model's top left x-coordinate.
 */
cn.model.PathModel.prototype.getX = function() {
  return this.path.getCurrentPoint()[0];
};


/**
 * @return {number} The model's top left y-coordinate.
 */
cn.model.PathModel.prototype.getY = function() {
  return this.path.getCurrentPoint()[1];
};


/**
 * Performs a translation transform on the model.
 * @param {number} dx The x translation delta.
 * @param {number} dy The y translation delta.
 */
cn.model.PathModel.prototype.translate = function(dx, dy) {
  this.path.transform(cn.model.PathModel.tx_.setToTranslation(dx, dy));
};