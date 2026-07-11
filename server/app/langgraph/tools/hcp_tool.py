from langchain_core.tools import tool
from app.services.hcp_service import HCPService
from app.services.interaction_service import InteractionService

@tool
def get_hcp_details(doctor_name: str) -> str:
    """Fetch HCP information including specialization, hospital, and previous interactions."""
    hcps = HCPService.get_all_hcps()
    
    # Simple search by name
    matched_hcp = None
    for hcp in hcps:
        if doctor_name.lower() in hcp.name.lower():
            matched_hcp = hcp
            break
            
    if not matched_hcp:
        return f"Could not find an HCP matching the name '{doctor_name}'."
        
    # Get previous interactions for this HCP
    all_interactions = InteractionService.get_all_interactions()
    hcp_interactions = [i for i in all_interactions if i.hcp_id == matched_hcp.id]
    
    # Format the response
    details = (
        f"HCP Details:\n"
        f"- Name: {matched_hcp.name}\n"
        f"- Specialization: {matched_hcp.specialty}\n"
        f"- Hospital: {matched_hcp.hospital}\n"
        f"- Email: {matched_hcp.email}\n\n"
        f"Previous Interactions ({len(hcp_interactions)} found):\n"
    )
    
    for interaction in hcp_interactions:
        details += (
            f"  - Date: {interaction.date}, Type: {interaction.interaction_type}, "
            f"Topic: {interaction.topic}, Outcome: {interaction.outcome}\n"
        )
        
    return details
