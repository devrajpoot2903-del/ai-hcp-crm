from typing import Optional
from langchain_core.tools import tool
from app.services.interaction_service import InteractionService
from app.services.hcp_service import HCPService

@tool
def search_interactions(
    doctor_name: Optional[str] = None,
    date: Optional[str] = None,
    keyword: Optional[str] = None,
    interaction_type: Optional[str] = None
) -> str:
    """Search interaction history by doctor name, date, keyword, or type."""
    interactions = InteractionService.get_all_interactions()
    
    results = interactions
    
    # Filter by doctor_name
    if doctor_name:
        hcps = HCPService.get_all_hcps()
        matched_hcps = [h.id for h in hcps if doctor_name.lower() in h.name.lower()]
        results = [i for i in results if i.hcp_id in matched_hcps]
        
    # Filter by date
    if date:
        results = [i for i in results if i.date == date]
        
    # Filter by interaction_type
    if interaction_type:
        results = [i for i in results if i.interaction_type.lower() == interaction_type.lower()]
        
    # Filter by keyword (search in topic, summary, and key_takeaways)
    if keyword:
        k = keyword.lower()
        results = [
            i for i in results 
            if (i.topic and k in i.topic.lower()) or 
               (i.summary and k in i.summary.lower()) or 
               (i.key_takeaways and k in i.key_takeaways.lower())
        ]
        
    if not results:
        return "No interactions found matching your criteria."
        
    response = f"Found {len(results)} interaction(s):\n"
    for r in results:
        # Resolve doctor name directly from the response object if enriched, 
        # otherwise from hcp service
        doc_name = r.hcp_name or "Unknown HCP"
        response += (
            f"- ID: {r.id}\n"
            f"  Doctor: {doc_name}\n"
            f"  Date: {r.date}\n"
            f"  Type: {r.interaction_type}\n"
            f"  Topic: {r.topic}\n"
            f"  Outcome: {r.outcome}\n"
            f"  Summary: {r.summary}\n\n"
        )
        
    return response
