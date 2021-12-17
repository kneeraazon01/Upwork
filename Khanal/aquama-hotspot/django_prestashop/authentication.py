"""
Provides Django auth backend for Prestashop
"""

# Copyright Aquama 2021
# Author: Sébastien Gendre <sgendre@aquama.com>

import requests
import bcrypt


def account_is_valid(username: str, password: str,
                     api_root: str, api_key: str,
                     is_customer: bool=True):
    """Check if the given account is valid on the prestashop

    Your prestashop need to expose "employees" and "customers"
    ressources through its webservice API.

    Parameter:
    - username: User name to check
    - password: Password to check
    - api_root: Root URL to the webservice API of your 
      Prestashop, end with a /
    - api_key: Key used to ask the API
    - is_customer: Define if account is checked on 
      "employees" or "customers" ressources

    Return:
    True if the account exist on the Prestashop and the password is
    correct, else False
    """

    # Define the API endpoint, based on the API root and the type of
    # ressource
    if is_customer:
        api_endpoint = f'{api_root}customers/'
    else:
        api_endpoint = f'{api_root}employees/'

    # Request Prestashop for ressource(s) with the given user name
    # Build the request url
    request_url = '{endpoint}?{settings}'.format(
        endpoint=api_endpoint,
        settings='&'.join(
            (
                f'filter[email]={username}',
                'output_format=JSON',
            )
        )
    )
    # Do the request
    result = requests.get(
        request_url,
        auth=(api_key, ''),
    )
    
    # If no result, the api return an empty list
    if isinstance(result.json(), list):
        return False
    
    # Extract the users ids
    if is_customer:
        users_ids = result.json().get('customers', [])
    else:
        users_ids = result.json().get('employees', [])

    # Check if ressource exist
    if len(users_ids) == 0:
        # No ressource, the user don't exist
        return False

    # Retrive the user data
    for user_id in (user_data.get('id') for user_data in users_ids):
        breakpoint()
        # Build the request url
        request_url = '{endpoint}{id}?{settings}'.format(
            endpoint=api_endpoint,
            id=user_id,
            settings='&'.join(
                (
                    'output_format=JSON',
                )
            )
        )
        # Do the request
        result = requests.get(
            request_url,
            auth=(api_key, ''),
        )
        # Extract the ressource
        if is_customer:
            user = result.json().get('customer', {})
        else:
            user = result.json().get('employee', {})
    
        # Check the password
        if bcrypt.checkpw(
                password.encode('utf-8'),
                user.get('passwd', '').encode('utf-8'),
        ) is True:
            return True
        
    # If the code arrive here, that mean no user found have correct
    # passwd
    # So, return False
    return False


class PrestashopAuthentication:
    pass
