meteor-accounts-django
============================

A Meteor accounts package for the Django oauth toolkit


# How to use

1. `$ meteor add accounts-ui` (so we can use the configuration dialog in step 5)
2. Add to `smart.json`:
  1. `"accounts-django": { "git": "https://github.com/commoncode/meteor-accounts-django.git" },`
  2. `"accounts-django-base": { "git": "https://github.com/commoncode/meteor-accounts-django-base.git" }`
3. `$ mrt install`
4. `$ meteor add accounts-django`
5. Browser console: `Accounts._loginButtonsSession.configureService('django')`
6. Enter configuration information
7. Done!
