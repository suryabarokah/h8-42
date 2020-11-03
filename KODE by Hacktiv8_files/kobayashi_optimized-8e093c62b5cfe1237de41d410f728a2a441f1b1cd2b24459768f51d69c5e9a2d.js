(function() {
  var Analytics;

  Analytics = (function() {
    function Analytics() {}

    Analytics.prototype.identify_for_thinkific = function(user_id, mixpanel_person) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.identify(user_id);
        if (mixpanel_person != null) {
          mixpanel.people.set(mixpanel_person);
          return mixpanel.register({
            "Customer Status": mixpanel_person['Subscription Plan']
          });
        }
      }
    };

    Analytics.prototype.identify_for_tenant = function(user_email_address, mixpanel_person, person_traits) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.identify(user_email_address);
        if (mixpanel_person != null) {
          mixpanel.people.set(mixpanel_person);
        }
      }
      if (typeof analytics !== "undefined" && analytics !== null) {
        if (person_traits == null) {
          person_traits = {};
        }
        return analytics.identify(user_email_address, person_traits);
      }
    };

    Analytics.prototype.alias_for_site_owner = function(user_id, original_mixpanel_id) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        return mixpanel.alias(user_id, original_mixpanel_id);
      }
    };

    Analytics.prototype.alias_for_thinkific = function(user_id) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        return mixpanel.alias(user_id);
      }
    };

    Analytics.prototype.alias_for_tenant = function(user_email_address) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        return mixpanel.alias(user_email_address);
      }
    };

    Analytics.prototype.name_tag = function(name) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        return mixpanel.name_tag(name);
      }
    };

    Analytics.prototype.track = function(action, data, callback) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.track(action, data, callback);
      }
      if (typeof analytics !== "undefined" && analytics !== null) {
        analytics.track(action, data);
      }
    };

    Analytics.prototype.track_links = function(selector, action, data) {
      if (typeof mixpanel !== "undefined" && mixpanel !== null) {
        mixpanel.track_links(selector, action, data);
      }
    };

    Analytics.prototype.track_charge = function(value) {
      if ((typeof mixpanel !== "undefined" && mixpanel !== null) && (mixpanel.people != null)) {
        mixpanel.people.track_charge(value);
      }
    };

    return Analytics;

  })();

  window.ThinkificAnalytics = new Analytics();

}).call(this);
(function(w, t) {

  function Filestack(overrideOptions) {
    this.options = this.nonEmptyDeepMerge(this.defaultOptions, overrideOptions)
  }

  Filestack.prototype.nonEmptyDeepMerge = function(target, source) {
    var newHash = target;
    for (var key in source) {
      if (typeof source[key] === 'object') {
        newHash[key] = target[key];
        arguments.callee(target[key], source[key]);
      } else {
        switch(source[key]) {
          case null:
          case undefined:
          case '':
            newHash[key] = target[key];
            break;
          default:
            newHash[key] = source[key];
        }
      }
    }
    return newHash;
  }
  Filestack.prototype.brandElement = '.fsp-picker__brand';
  Filestack.prototype.compressionEndpoint = 'https://cdn.filestackcontent.com/output=compress:true/';
  Filestack.prototype.awsRootUrl = 'https://s3.amazonaws.com/';
  Filestack.prototype.removeWatermark = function () {
    w.setTimeout(function() {
      $(Filestack.prototype.brandElement).hide()
    }, 280)
  }
  Filestack.prototype.uploadsStartedAction = function () {
    $(".loader").removeClass("hidden");
  }
  Filestack.prototype.defaultOptions = {
    accept: ['image/*'],
    fromSources: ['local_file_system', 'url', 'imagesearch', 'facebook', 'instagram',
      'googledrive', 'dropbox', 'onedrive'],
    exposeOriginalFile: true,
    transformations: {
      crop: {
        aspectRatio: 16/9
      },
      circle: false,
      rotate: true
    },
    storeTo: {
      location: 's3',
      access: 'public',
      region: 'us-east-1'
    },
    onUploadStarted: Filestack.prototype.uploadsStartedAction,
    onOpen: Filestack.prototype.removeWatermark,
    maxSize: 10*1024*1024, // 10MB
    maxFiles: 1,
    uploadInBackground: false
  };

  Filestack.prototype.open = function () {
    if (w.filestack) {
      w.filestack.picker(this.options).open()
    } else {
      if (w.confirm('There was an error loading this page. Please be patient as we reload!')) {
        // Evaluates only when 'OK' is clicked
        w.location.reload()
      }
    }
  }

  Filestack.prototype.cancel = function () {
    if (w.filestack) {
      w.filestack.picker(this.options).close()
    } else {
      if (w.confirm('There was an error loading this page. Please be patient as we reload!')) {
        // Evaluates only when 'OK' is clicked
        w.location.reload()
      }
    }
  }

  t.Filestack = t.Filestack || Filestack;
}(window, window.Thinkific))
;


