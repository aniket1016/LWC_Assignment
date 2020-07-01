public class AssignmentController {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchText,Integer recordNumber){
        
        searchText = '%' + searchText + '%';
        return [select Id,Name from Account where Name LIKE :searchText LIMIT :recordNumber];
    }

}