---
title: GameObject Pool
date: 2023-08-30
tags:
  - c#
  - unity
  - gamedev
  - patterns
---

[Object pooling](https://en.wikipedia.org/wiki/Object_pool_pattern) in Unity. Useful when creating and destroying a lot of game objects to avoid burdening the CPU.

```csharp
using UnityEngine;
using System.Collections.Generic;

public static class GameObjectPool
{
    private static Dictionary<GameObject, Pool> pools = new();

    class PoolRef : MonoBehaviour
    {
        public Pool pool;
    }

    class Pool
    {
        private Stack<GameObject> recycled = new();
        private GameObject prefab;
        private int nextId = 1;

        public Pool(GameObject prefab)
        {
            this.prefab = prefab;
        }

        public GameObject Get(Vector3 position, Quaternion rotation, Transform parent)
        {
            GameObject go;

            if (recycled.Count == 0)
            {
                go = GameObject.Instantiate(prefab, position, rotation, parent);
                go.name = prefab.name + " (" + (nextId++) + ")";
                go.AddComponent<PoolRef>().pool = this;
            }
            else
            {
                go = recycled.Pop();

                if (go == null)
                {
                    return Get(position, rotation, parent);
                }
            }

            go.transform.position = position;
            go.transform.rotation = rotation;
            go.transform.parent = parent;
            go.SetActive(true);
            return go;
        }

        public void Return(GameObject go)
        {
            go.SetActive(false);
            recycled.Push(go);
        }
    }

    static public GameObject Get(GameObject prefab, Vector3 position = default, Quaternion rotation = default, Transform parent = null)
    {
        Debug.Assert(prefab != null);

        if (!pools.ContainsKey(prefab))
        {
            pools[prefab] = new Pool(prefab);
        }

        return pools[prefab].Get(position, rotation, parent);
    }

    static public void Return(GameObject go)
    {
        PoolRef ref = go.GetComponent<PoolRef>();

        if (ref == null)
        {
            GameObject.Destroy(go);
        }
        else
        {
            ref.pool.Return(go);
        }
    }
}
```
