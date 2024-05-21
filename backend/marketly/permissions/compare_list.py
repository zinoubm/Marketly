from rest_framework import permissions
from marketly.models import CompareList


class IsOwnerOfCompareList(permissions.BasePermission):
    def has_permission(self, request, view):
        compare_list_id = request.data.get("compare_list")

        if compare_list_id is None:
            return False

        try:
            compare_list = CompareList.objects.get(id=compare_list_id)

        except CompareList.DoesNotExist:
            return False

        return compare_list.user == request.user
