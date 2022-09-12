.. _sphinx_example:

==============
Sphinx example
==============

It is possible to use the ``github-action-push-to-another-repository`` to publish Sphinx documentation that is pushed into a GitHub repository into GitHub Pages (for example pushing the generated documentation into a branch of the same repository).

This is how the documentation for the action is published: using the documented action.

In the following example the documentation is pushed into a repository and the same repository (different branch) is used to make the documentation available using GitHub Pages. This could also be done using a different repository.

Steps (can change depending on your Sphinx setup, GitHub repositories setup, etc.)::
 #. Write the documentation using `Sphinx`_
 #. Make sure that you can build the documentation using ``make html`` in a virtual environment
 #. Using git command line or even GitHub page for your repository (clicking on the branches): create a new branch named ``gh-pages`` (or any other name)
 #. In the settings for your repository: on the left hand side click on ``Pages`` and then, in ``Source`` select ``Deploy from a branch``. In Branch select ``gh-pages`` (or the name that you chose for the branch) and select the folder ``/docs``

Once this is done you can follow the ``publish.yml`` example (see comments below):

.. code-block:: yaml
 :linenos:

 name: build documentation and publish

 on:
   push:
     branches: [ main ]
   pull_request:
     branches: [ main ]

 jobs:
   publish:
     runs-on: ubuntu-latest
     steps:
       - uses: actions/checkout@v2
       - uses: actions/setup-python@v4
         with:
           python-version: '3.9'
       - run: pip install -r requirements.txt
       - name: build documentation
         run: make html
       - run: touch _build/html/.nojekyll
       - uses: cpina/github-action-push-to-another-repository@main
         env:
           SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
         with:
           source-directory: '_build/html'
           destination-github-username: 'cpina'
           destination-repository-name: 'push-to-another-repository-docs'
           user-email: carles@pina.cat
           target-branch: gh-pages
           target-directory: docs


See the `push-to-another-repository-docs repository`_. In particular the file `.github/workflows/publish.yml`_ which will:
 - Checkout the origin repository (line 13)
 - Setup Python version 3.9 (lines 14-16)
 - Install the packages in your ``requirements.txt`` (contains Sphinx) (line 17)
 - Build the documentation (line 18-19)
 - Create ``.nojekyll`` file to also publish the ``_static`` directory (`as documented`_) (line 20)
 - Usual github-action-push-to-another-repository setup (lines 21-30). The ``destination-repository-name`` is the same that the action is executed and the ``target-branch`` matches the one setup in the repository settings)

.. _push-to-another-repository-docs repository: https://github.com/cpina/push-to-another-repository-docs
.. _.github/workflows/publish.yml:  https://github.com/cpina/push-to-another-repository-docs/blob/main/.github/workflows/publish.yml
.. _Sphinx: https://www.sphinx-doc.org/en/master/
.. _as documented: https://github.blog/2009-12-29-bypassing-jekyll-on-github-pages/