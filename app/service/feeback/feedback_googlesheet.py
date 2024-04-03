import datetime
import json
from setting import GOOGLE_SHEET_JSON_DICT, GOOGLE_SHEET_RANGE_FEEDBACK, GOOGLE_SHEET_ID
import pytz
import gspread
from oauth2client.service_account import ServiceAccountCredentials


def auth_googleshet():
    keyfile_dict = GOOGLE_SHEET_JSON_DICT
    scope = ['https://spreadsheets.google.com/feeds', 'https://www.googleapis.com/auth/drive']
    credentials = ServiceAccountCredentials.from_json_keyfile_dict(keyfile_dict, scope)
    client = gspread.authorize(credentials)
    return client
def send_feedback_ggsheet(full_name, job_title, description):
    spreadsheet_id = GOOGLE_SHEET_ID
    range_name = GOOGLE_SHEET_RANGE_FEEDBACK
    client = auth_googleshet()
    sheet = client.open_by_key(spreadsheet_id).worksheet(range_name)
    data = [str(datetime.datetime.now(tz=pytz.timezone('Asia/Ho_Chi_Minh'))), full_name, job_title, description]
    sheet.append_row(data)
    return {
        "status": "success"
    }

def get_feedback_googlesheet():
    spreadsheet_id = GOOGLE_SHEET_ID
    range_name = GOOGLE_SHEET_RANGE_FEEDBACK
    client = auth_googleshet()
    sheet = client.open_by_key(spreadsheet_id).worksheet(range_name)
    rows = sheet.get_all_values()[1:]
    json_temp = {
        "create_time": "",
        "full_name": "",
        "job_title": "",
        "description": ""
    }
    json_data = []
    for row in rows:
        json_data.append({
            "create_time": row[0],
            "full_name": row[1],
            "job_title": row[2],
            "description": row[3]
        })
    return json_data
