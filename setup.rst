.. _setup:

=====
Setup
=====

.. note::
  **Summary**: choose between :ref:`SSH deploy keys <setup_ssh_deploy_keys>` (recommended) or :ref:`Personal Access Token <setup_personal_access_token>` (probably easier to setup). Then follow the :ref:`setup example <setup_example>`.

Before using the GitHub Action, either the :ref:`SSH Keys (recommended) <setup_ssh_deploy_keys>` or the :ref:`Personal Access Token <setup_personal_access_token>` need to be set up as described below.

-------------------------------------------
``SSH_DEPLOY_KEY`` Vs. ``API_TOKEN_GITHUB``
-------------------------------------------

The Action, entirely executed in your GitHub continuous integration environment, needs to be able to push to the destination repository.

There are two options to give permissions for the action (that executes in your workflow) to push to the destination repository:

- :ref:`Using SSH deploy keys <setup_ssh_deploy_keys>`: This key is restricted to the destination repository only (recommended)
- :ref:`Using GitHub Personal Access Token <setup_personal_access_token>`: The Token has access to all your repositories

Using the Personal Access Token, and if someone with write access to your repository or to this Action, could technically add code to leak the Token. Thus, **it is recommended to use the SSH deploy key method to minimise the impact** if this were to happen (the Personal Access Token would give access to more GitHub resources, not only the destination repository).

Initially, this Action only used the Personal Access Token method and it still supports both methods to keep backwards compatibility.

---------------------------
Setup using SSH deploy keys
---------------------------

Refer to the section :ref:`Using SSH deploy keys <setup_ssh_deploy_keys>`. Not needed if you chose to use the Personal Access Token setup.

---------------------------------
Setup using Personal Access Token
---------------------------------

Refer to the section :ref:`Using GitHub Personal Access Token <setup_personal_access_token>`. Not needed if you chose to use the SSH deploy keys.

--------------------------------------
Write your ``.github/workflow/ci.yml``
--------------------------------------

Refer to :ref:`Setup example <setup_example>`.