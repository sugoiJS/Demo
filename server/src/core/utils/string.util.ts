export class StringUtils{
    public static guid() {
        function generate() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return generate() + generate() + '-' + generate() + '-' + generate() + '-' + generate() + '-' + generate() + generate() + generate();
    }
}