---
title: "EKS에서 IAM User Group으로 권한주기"
published_at: "2022-09-21T00:00:00+09:00"
summary: "권한 관리의 한계"
---

권한 관리의 한계

EKS에서 권한은 mapRoles 혹은 mapUsers를 활용해 IAM Role 혹은 User에만 할당할 수 있습니다.
IAM User Group으로 권한주기

IAM User Group에서 sts:AssumeRole권한을 이용해 원하는 IAM Role 권한으로 인증할 수 있습니다.

    User Group 생성

    EKS에서 권한을 대신 주기위한 Role 생성

    Trust Policy

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Principal": {
                    "AWS": "arn:aws:iam::${aws_account_id}:root"
                },
                "Action": "sts:AssumeRole"
            }
        ]
    }

    웹 콘솔에서는"AWS account" 선택

    User Group Permission 추가

    Permission Policy

    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "",
                "Effect": "Allow",
                "Action": [
                    "sts:AssumeRole"
                ],
                "Resource": [
                    "arn:aws:iam::${aws_account_id}:role/${role_name}"
                ]
            }
        ]
    }

    EKS aws-auth ConfigMap에 IAM Role 추가

    aws-auth ConfigMap

    apiVersion: v1
    data:
      mapRoles: |
        - groups:
          - system:masters
          rolearn: arn:aws:iam::${aws_account_id}:role/${role_name}
          username: ${role_name}
        ...

    Kubernetes Context 추가

    aws eks update-kubeconfig --region <aws-region-name> --name <eks-cluster-name> --role-arn arn:aws:iam::${aws_account_id}:role/${role_name}

참고문헌

    https://eng.grip.security/enabling-aws-iam-group-access-to-an-eks-cluster-using-rbac

Powered by Deno Blog

RSS
