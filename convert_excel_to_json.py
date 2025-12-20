import pandas as pd
import json
import math

def convert_excel_to_json():
    try:
        # Read the Excel file
        df = pd.read_excel('assets/Submission Sheet(2).xlsx')
        
        teams = []
        
        # Iterate through rows
        for index, row in df.iterrows():
            team_number = row.get('Your Team Number (check our website and be sure about your team number and if there\'s any mistake with your team information, tell us)')
            
            # Skip if team number is missing or NaN
            if pd.isna(team_number):
                continue
                
            try:
                team_number = int(team_number)
            except ValueError:
                continue # Skip if not a valid number

            # Get members
            members_str = row.get('Please list the names of all team members.')
            if pd.isna(members_str):
                # Fallback to singular column if plural is empty (though inspection showed plural had data)
                members_str = row.get('Please list the names of all team member.')
            
            members = []
            if not pd.isna(members_str):
                # Split by comma or newline if present, otherwise just take the string
                # Based on inspection, it seems to be a single string, maybe comma separated?
                # The inspection showed "Mazhar Umut Odacı", so maybe just one name for solo?
                # Let's assume comma separation for now as a safe bet for multiple members
                members = [m.strip() for m in str(members_str).replace('\n', ',').split(',') if m.strip()]

            website_link = row.get('Your Website Link')
            if pd.isna(website_link):
                website_link = None
            
            team_data = {
                "teamNumber": team_number,
                "members": members,
                # "participationType": "Online" # Default or missing, logic in JS will handle missing
            }
            
            if website_link:
                team_data["websiteLink"] = website_link

            teams.append(team_data)
        
        # Sort by team number
        teams.sort(key=lambda x: x['teamNumber'])
        
        # Write to JSON
        with open('assets/teams.json', 'w', encoding='utf-8') as f:
            json.dump(teams, f, indent=2, ensure_ascii=False)
            
        print(f"Successfully converted {len(teams)} teams to assets/teams.json")
        
    except Exception as e:
        print(f"Error converting Excel to JSON: {e}")

if __name__ == "__main__":
    convert_excel_to_json()
