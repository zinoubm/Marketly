from rest_framework import serializers
from marketly.models import CompareList, CompareItem
from marketly.serializers import CompareItemSerializer


class CompareListSerializer(serializers.ModelSerializer):
    compare_items = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = CompareList
        fields = "__all__"
        read_only_fields = ["user"]

    def get_compare_items(self, obj):
        compare_items_qs = CompareItem.objects.filter(compare_list=obj)
        compare_items_serializer = CompareItemSerializer(
            instance=compare_items_qs, many=True
        )
        return compare_items_serializer.data
