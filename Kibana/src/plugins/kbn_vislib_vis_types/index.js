'use strict';

module.exports = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/kbn_vislib_vis_types/kbn_vislib_vis_types']
    }

  });
};
