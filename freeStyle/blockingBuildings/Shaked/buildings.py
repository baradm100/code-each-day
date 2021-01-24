from typing import List

buildings = [101,87,122,208,74,107,152,130]
expected_output = [0,1,0,0,4,4,4,7]

def find_bloking_buildings(buildings: List[int]) -> List[int]:
    blocked_building = [] 
    output = []

    for index, building in enumerate(buildings): # תעבור על כל הבניינים - O(N)
        while len(blocked_building): # כל עוד יש לי בניינים חוסמים - on all runs together O(N) every building could be pushed only once so max while will be on N elements
            if buildings[blocked_building[-1]] <= building: # אם הבניין החוסם נמוך או באותו הגובה מהבניין הנוכחי
                blocked_building.pop() # תעיף אותו החוצה כי הוא לא באמת חוסם
            else:
                blocked_building_index = blocked_building[-1] + 1 # אם הוא לא יותר נמוך - הבניין חוסם את הנוף
                output.append(blocked_building_index) # תוסיף אותו לתשובה
                break # אין צורך להמשיך לחפש כי מצאנו בניין חוסם
        if len(blocked_building) == 0:
            output.append(0) # אם אף בניין לא חוסם - תוסיף 0 לתשובה
        blocked_building.append(index) # תוסיף את הבניין הנוכחי לבניינים החוסמים
    return output

ans = find_bloking_buildings(buildings)
assert ans == expected_output
print(ans)
