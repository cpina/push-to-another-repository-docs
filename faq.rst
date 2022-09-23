.. _faq::

===
FAQ
===

-------------------------------------------------------------------------------------------------------
Can github-action-push-to-another-repository be used to publish Sphinx documentation into GitHub pages?
-------------------------------------------------------------------------------------------------------

Yes, see the `example`_.

-----------------------------------------------------------------------------------
How can I copy only some files / only some directories / exclude some files / etc.?
-----------------------------------------------------------------------------------

If you need to filter files or directories (exclude files, include only some, etc.) use a step before the Action to filter these into a temporary directory that will be pushed. This can be done with "rsync" or any tool that you feel comfortable with (this could be "rclone" or "find + exec + rm", "find + exec + mv", etc. depending on your needs).

See a `working example`_ to exclude a generated file (*main.epub*).

.. code-block:: yaml
 :emphasize-lines: 7-8,15

 jobs:
   build:
     runs-on: ubuntu-latest
     container: ubuntu
     steps:
       - uses: actions/checkout@v2
       - name: Copy output_temp/ to output/ using rsync (to exclude main.epub in this example)
         run:  apk add rsync && rsync -arv --exclude="/main.epub" output_temp/ output/
       - name: Pushes to another repository
         id: push_directory
         uses: cpina/github-action-push-to-another-repository@main
         env:
           SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
         with:
           source-directory: output/
           destination-github-username: 'cpina'
           destination-repository-name: 'push-to-another-repository-output'
           user-email: carles3@pina.cat
           target-branch: main


In the step above, ``rsync`` is installed (depending on your environment it will already be installed) and everything is copied from ``output_temp`` to ``output`` excluding ``main.epub``. Be careful with the usage of "/" and the exclude parameter in rsync directories. Refer to the rsync documentation for other options such as filtering using an extension to include only some files / directories, etc. ``rsync`` filters are very flexible.

------------------------------------
How can I copy the whole repository?
------------------------------------

Use ``source_directory: .`` do not use ``destination-directory`` or ``destination-directory: .``, to copy all the source GitHub repository to the destination.

.. warning::
  This will also copy ``.github/workflows/``! The destination repository will try to execute the Action. It will probably fail because the SSH keys / Personal Access Token will not be available for the destination repository.

An easy way to avoid the execution in the destination repository if you are using ``source_directory: .`` is to disable the GitHub Actions in the destination repository. To disable GitHub Actions in the destination repository:

 #. Go to the destination repository (e.g. https://github.com/cpina/push-to-another-repository-output/settings)
 #. Click on "Settings"
 #. On the left side bar click on "Actions" and then "General"
 #. Click on "Disable actions"
 #. Click on "Save"

.. _example: https://cpina.github.io/push-to-another-repository-docs/sphinx-example.html
.. _working example: https://github.com/cpina/push-to-another-repository-deploy-keys-example/blob/main/.github/workflows/ci.yml#L21
.. _push-to-another-repository-docs repository: https://github.com/cpina/push-to-another-repository-docs
.. _.github/workflows/publish.yml: https://github.com/cpina/push-to-another-repository-docs/blob/main/.github/workflows/publish.yml

-----------------------------------------------------------
Could it work on Mac OS, Windows or No Docker environments?
-----------------------------------------------------------

The ``main`` branch or the main releases (named ``v1.5.1``, etc.) don't support Mac OS X or Windows, only Linux. This is the reason that something along the lines of the following is needed in ``.github/workflows/file.yml``:

.. code-block:: yaml

 runs-on: ubuntu-latest
 container: ubuntu

GitHub runs the Action in a Docker container and makes the files (from the previous steps, like the usual `build.sh`) available in the container.

There is a different branch of the GitHub Action working on ``composite`` mode instead of Docker mode. Specify the ``@composite-1.5.1`` branch, for example:

.. code-block:: yaml
 :emphasize-lines: 2

      - name: Pushes to another repository
        uses: cpina/github-action-push-to-another-repository@composite-1.5.1
        env:
          SSH_DEPLOY_KEY: ${{ secrets.SSH_DEPLOY_KEY }}
        with:
          source-directory: output/
          destination-github-username: 'cpina'
          destination-repository-name: 'push-to-another-repository-playground'
          user-email: carles@pina.cat
          target-branch: pushed-from-action

There are some things that you need to be aware of:

  * the Action uses ``#!/bin/sh``. It should work on workers that can execute ``#!/bin/sh`` (Mac should be okay; Windows might need some extra setup)
  * the Action uses the binary ``ssh-keyscan`` (usually packaged with ``openssh-client``) and ``git``. They need to be installed if you do not already have them. You might need to modify the `action.yml`_ of the forked GitHub Action.
  * because the Action is running in the environment of the real machine, and the environment might be different in different installations and versions, it is possible that problems will occur. Read the output and fork the project if changes are needed. There is no error checking for binaries or versions of git, shell versions, etc. If you need help, get in touch via a new `GitHub Issue`_. If it works for you, feel free to get in touch as well using a `GitHub Issue`_ so that I am aware (I will close it saying thank you)

.. _action.yml: https://github.com/cpina/github-action-push-to-another-repository/blob/composite-1.5.1/action.yml#L60
.. _GitHub Issue: https://github.com/cpina/github-action-push-to-another-repository/issues/new?assignees=&labels=Windows-Mac-NoDocker&template=windows_mac_nodocker.md&title=
